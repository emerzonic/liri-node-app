require("dotenv").config();
const Spotify = require('./api/spotify');
const Twitter = require('./api/twitter');
const Movie = require('./api/movie');
const command = require('./command');
const fileWritter = require('./fileManager/fileWriter');
const fileReader = require('./fileManager/fileReader');

class LiriApp {
    constructor() {
        this.command = process.argv[2];
        this.input = process.argv[3];
        this.baseCommand = command.baseCommand;
        this.tweeterCommand = command.tweeter;
        this.spotifyCommand = command.spotify;
        this.movieCommand = command.movie;
    }

    async executeCommand() {
        if (this.command === this.baseCommand) {
            fileReader.readFile(({
                command,
                input
            }) => {
                this.command = command;
                this.input = input;
                this.delegateCommand();
            });
        } else {
            this.delegateCommand();
        }
    }

    delegateCommand() {
        switch (this.command) {
            case this.tweeterCommand:
                Twitter.getTweets();
                break;
            case this.spotifyCommand:
                Spotify.getSong(this.input);
                break;
            case this.movieCommand:
                Movie.getMovie(this.input);
                break;

            default:
                console.log(`Oops! You did not provide a command. Enter 
                "my-tweets" to get all your tweets, 
                "spotify-this-song" and song name to get a song, and 
                "movie-this" and movie name to get a movie`);
                break;
        }
        fileWritter.logCommand({command: this.command, input: this.input});
    }
}

module.exports = LiriApp;