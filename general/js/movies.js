const apiKey = '1070730380f5fee0d87cf0382670b255'; // Replace with your TMDB API key
let selectedShowId = null;

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('search').value;
    const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const tvResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`);
    
    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();
    
    displayResults(movieData.results, 'Movie');
    displayResults(tvData.results, 'TV Show');
});

function displayResults(items, type) {
    const resultsDiv = document.getElementById('results');

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${item.poster_path}" alt="${item.title || item.name}">
            <h3>${item.title || item.name}</h3>
            <p>${type}</p>
        `;
        itemDiv.addEventListener('click', () => {
            if (type === 'TV Show') {
                selectedShowId = item.id; // Store the selected show ID
                document.getElementById('popup').style.display = 'flex'; // Show the popup
            } else {
                window.location.href = `/storage/movies.html?tmdb_id=${item.id}&type=${type}`;
            }
        });
        resultsDiv.appendChild(itemDiv);
    });
}

document.getElementById('closePopup').addEventListener('click', () => {
    const season = document.getElementById('seasonInput').value;
    const episode = document.getElementById('episodeInput').value;

    if (season && episode) {
        window.location.href = `/storage/movies.html?tmdb_id=${selectedShowId}&type=TV Show&season=${season}&episode=${episode}`;
    } else {
        alert("Please enter both season and episode numbers.");
    }
});

// Close the popup when clicking outside of it
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = "none";
    }
}