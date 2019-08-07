const Twitter = require('twitter');
const keys = require('../keys.js');

function getTweets() {
    const params = {};
    const client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (!error) {
            tweets.forEach(function (tweet, index) {
                const tweetText = `
                *******************************
                MY TWEET #${index+1}
                Tweet: ${tweet.text}
                created at: ${tweet.created_at}
                *******************************
                `
                console.log(tweetText);
            })
        }
    });
}

module.exports = {
    getTweets
}