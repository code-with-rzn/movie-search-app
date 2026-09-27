
// Get HTML elements
const movieForm = document.getElementById("movie-form");
const movieInput = document.getElementById("movie-input");
const movieResults = document.getElementById("movie-results");
const movieDetails = document.getElementById("movie-details");
const clearBtn = document.getElementById("clear-btn");

// Listen for form submission
movieForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const movieName = movieInput.value.trim();

    if (movieName === "") {
        alert("Please enter a movie name.");
        return;
    }

    searchMovies(movieName);
});
clearBtn.addEventListener("click", function() {

    movieInput.value = "";
    movieResults.innerHTML = "";
    movieDetails.innerHTML = "";

});

// Search movies using OMDb API
async function searchMovies(movieName) {

    movieResults.innerHTML = "<p class='loading'>Searching...</p>";

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

     if (data.Response === "True") {

    displayMovies(data.Search);

} else {

    movieResults.innerHTML =
        `<p class="error">${data.Error}</p>`;
}

    } catch (error) {

        console.error("Error:", error);

        movieResults.innerHTML =
            "<p class='error'>Something went wrong. Please try again.</p>";
    }
}
// Display movies on the page
function displayMovies(movies) {

    movieResults.innerHTML = "";

    movies.forEach(function(movie) {
    

        const movieCard = document.createElement("div");

        movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
<img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}" alt="${movie.Title}">
    <h2>${movie.Title}</h2>
    <p>Year: ${movie.Year}</p>
    <p>Type: ${movie.Type}</p>
    <button class="details-btn">View Details</button>
`;
const detailsBtn = movieCard.querySelector(".details-btn");
detailsBtn.addEventListener("click", function() {

    console.log("View Details clicked");
    console.log("IMDb ID:", movie.imdbID);

    getMovieDetails(movie.imdbID);

});


        movieResults.appendChild(movieCard);
    });
}
// Get detailed information about a movie
async function getMovieDetails(imdbID) {
    movieDetails.innerHTML = "<p class='loading'>Loading movie details...</p>";
    movieDetails.innerHTML = "";

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;

    try {

        const response = await fetch(url);

        const data = await response.json();
        console.log("Movie Details:", data);
        console.log("About to display movie details");

movieDetails.innerHTML = `
    <div class="details-card">

        <img src="${data.Poster}" alt="${data.Title}">

        <div class="details-content">

            <h2>${data.Title}</h2>

            <p><strong>Year:</strong> ${data.Year}</p>

            <p><strong>Genre:</strong> ${data.Genre}</p>

            <p><strong>Director:</strong> ${data.Director}</p>

            <p><strong>Actors:</strong> ${data.Actors}</p>

            <p><strong>IMDb Rating:</strong> ⭐ ${data.imdbRating}</p>

            <p><strong>Plot:</strong> ${data.Plot}</p>

        </div>

    </div>
`;
    } catch (error) {

        console.error("Error:", error);
    }
}