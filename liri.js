require("dotenv").config();
var fs = require("fs"),
    keys = require('./keys.js'),
    request = require("request"),
    Spotify = require('node-spotify-api'),
    Twitter = require('twitter');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var input2 = process.argv[3];


//check if the user passes a command
if (input === 'do-what-it-says') {
    readRandom(); //read from the file
} else {
    check();
}

function readRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        for (var i = 0; i < dataArr.length; i++) {
            input = dataArr[0];
            input2 = dataArr[1];
        }
        check();
    });
}

function check() {
    if (input === 'my-tweets') {
        tweetsIt();
    } else if (input === 'spotify-this-song') {
        spotifyIt();
    } else if (input === 'movie-this') {
        movieIt();
    } else {
        console.log('Oops! You did not provide a command. my-tweets for tweets, spotify-this-song for song, and movie-this for movie');
    }
    addToLogs();
}


function movieIt() {
    var movieInput = input2;
    if (movieInput === undefined) {
        movieInput = 'Mr Nobody';
    }
    request(`http://www.omdbapi.com/?t= ${movieInput} &apikey=2139148`, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            console.log('error:', error); // Print the error if one occurred 
            console.log('statusCode:', response && response.statusCode);
        }
        var movie = JSON.parse(body);
        console.log('\n');
        console.log('======================================');
        console.log('******** MY MOVIE RESULT *************');
        console.log('======================================');
        console.log(`Title: ${movie.Title}`);
        console.log(`Year: ${movie.Year}`);
        console.log(`IMDB Rating: ${movie.imdbRating}`);
        console.log(!undefined ? `Rotten Tomatoes Rating: ${movie.Ratings[1].Value}` : 'Rotten Tomatoes Rating: N/A');
        console.log(`Country: ${movie.Country}`);
        console.log(`Language: ${movie.Language}`);
        console.log(`Plot: ${movie.Plot}`);
        console.log(`Actors: ${movie.Actors}`);
        console.log('=======================================');
        console.log('\n');
    });
}


function tweetsIt() {
    var params = {
        screen_name: '@emandoe18'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var j = 0; j < 20; j++) {
               var tweet = tweets[j];
                console.log(`MY TWEET #${j+1}: *******************************`);
                console.log(`Tweet: ${tweet.text}`);
                console.log(`created at: ${tweet.created_at}`);
                console.log('============================================================\n');
                // });
            }
        }
    });
}



function spotifyIt() {
    var song = input2;
    if (song === undefined) {
        song = 'The Sign Ace of Base';
    }
    spotify
        .search({
            type: 'track',
            query: song,
            limit: 4
        })
        .then(function (response) {
            // console.log(response.tracks.items[0]);
            var track = response.tracks;
            console.log('\n');
            console.log('**** MY SONG RESULT ***********');
            console.log('Artist: ' + track.items[0].artists[0].name);
            console.log('Song: ' + track.items[0].name);
            console.log('Url: ' + track.items[0].preview_url);
            console.log('Album: ' + track.items[0].album.name);
            console.log('===========================================');
        })
        .catch(function (err) {
            console.log(err);
        });
}

//this function adds the user input to the random.txt file
function addToLogs() {
    fs.appendFile('logs.txt', `${input}\n`, function (err) {
        if (err) {
            console.log(err);
        }
    });
}