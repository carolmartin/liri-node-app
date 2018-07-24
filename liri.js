// Read and set any environmnet variables with dotenv package

require("dotenv").config();

var request = require("request");

var keys = require('./keys.js');

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var Spotify = require("node-spotify-api");
var spotifyVar = new Spotify(keys.spotify);



//Take in commands and process accordingly

var operation = process.argv[2];


console.log(operation);
if (operation === "my-tweets") {
    console.log("my-tweets");
    myTweets();

}
else if (operation === "spotify-this-song") {
    console.log("spotify-this-song");
    spotifySong();

}
else if (operation === "movie-this") {
    console.log("movie-this");

}
else if (operation === "do-what-it-says") {
    console.log("do-what-it-says");

}

function myTweets() {
    numTweets = 0;
    console.log("in MyTweets function");
    var params = { screen_name: 'carolmartin9128' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            if (tweets.length > 20) {
                numTweets = 20

            }
            else {
                numTweets = tweets.length;
            }
            for (i = 0; i < numTweets; i++){
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }

        }
    });
  }

function spotifySong() {
    
}