const request = require("request");
const keys = require('../keys.js');

function getMovie(movieTitle = 'Mr Nobody') {
    request(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${keys.movieAPIKey}`, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            const errorMessage = `error: ${error}, statusCode: ${response && response.statusCode}`;
            return  console.log(errorMessage);
        }
        const movie = JSON.parse(body);
        const {
            Title,
            Year,
            imdbRating,
            Country,
            Language,
            Plot,
            Actors,
            Ratings
        } = movie;

        const IMDBRating = imdbRating ? imdbRating : ' N/A';
        const RottenTomatoesRating = Ratings && Ratings[0] && Ratings[0].value ? Ratings[0].value : 'N/A';

        const movieResult = `
            ======================================
            ******** MY MOVIE RESULT *************
            ======================================
            Title: ${Title}
            Year: ${Year}
            IMDB Rating: ${IMDBRating} 
            Rotten Tomatoes Rating: ${RottenTomatoesRating} 
            Country: ${Country}
            Language: ${Language}
            Actors: ${Actors}
            Plot: ${Plot}
            =======================================`;
        console.log(movieResult);
    });
}

module.exports = {
    getMovie
}