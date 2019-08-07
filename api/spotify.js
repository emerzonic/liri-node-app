const Spotify = require('node-spotify-api');
const keys = require('../keys.js');


function getSong(songTitle = 'The Sign Ace of Base') {
    const spotifyClient = new Spotify(keys.spotify);
    const request = {
        type: 'track',
        query: songTitle,
        limit: 4
    };
    spotifyClient.search(request).then(function (response) {
        if (response) {
            response.tracks.items.forEach(function (track) {
                const {
                    artists,
                    name,
                    preview_url,
                    album
                } = track;

                const trackText = `
                        **** MY SONG RESULT ***********
                        Artist: ${artists[0].name ?artists[0].name: 'N/A' }
                        Song: ${name ? name : 'N/A'}
                        Url: ${preview_url ? preview_url : 'N/A' }
                        Album: ${album.name? album.name:'N/A'}
                        ===========================================`;
                console.log(trackText);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}

module.exports = {
    getSong
}