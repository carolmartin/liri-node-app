// Read and set any environmnet variables with dotenv package

require("dotenv").config();
var fs = require("fs");

var request = require("request");

var keys = require('./keys.js');

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var Spotify = require("node-spotify-api");
var spotifyVar = new Spotify(keys.spotify);

var OmdbApi = require('omdb-api-pt');
 
// Create a new instance of the module.
var omdb = new OmdbApi({
    apiKey: 'trilogy',   // Your API key.
    baseUrl: 'https://omdbapi.com'   // The base url of omdb. Defaults to 'https://omdbapi.com/'.
  });


//Take in commands and process accordingly

var operation = process.argv[2];
var parameter = process.argv[3];
console.log("parameter: " + parameter);

var songName = "";
var movieName = "";


console.log(operation);
if (operation === "my-tweets") {
    console.log("my-tweets");
    myTweets();

}
else if (operation === "spotify-this-song") {
    console.log("spotify-this-song");
    // spotifySong();
    songName = parameter;
    if (process.argv.length < 4) {
        songName = "The Sign";
    }
    getSpotifyInfo();

}
else if (operation === "movie-this") {
    console.log("movie-this");
    movieName = parameter;
    if (process.argv.length < 4) {
        movieName = "Mr. Nobody";
    }
    getMovieInfo(movieName);
    


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
            for (i = 0; i < numTweets; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }

        }
    });
}

function spotifySong() {

    var outputArray = [];
    var songName;

    fs.readFile("random.txt", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // random.txt contains a record with the command spotify-this-song
        // followed by a comma and a song name
        // Load the song name into output and than run spotify search
        console.log("data " + data);
        outputArray = data.split(",");

        console.log("outputArray length: " + outputArray.length);
        for (var i = 0; i < outputArray.length; i++) {
            console.log(outputArray[i]);

        }
        var x = 1;
        songName = outputArray[x];

        console.log("song name: " + outputArray[x]);

        getSpotifyInfo();



        // spotifyVar.search({ type: 'track', query:'I Want it That Way'}, function (err, data) {

    });

}
function getSpotifyInfo() {
    spotifyVar.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (data.tracks.items.length > 20) {
            numSpotify = 20;

        }
        else {
            numSpotify = data.tracks.items.length;

        }
        console.log(("------- Spotify List of Songs --------"));
        console.log("number of Spotify returns: " + numSpotify);
        for (i = 0; i < numSpotify; i++) {
            console.log(i + "  --------------------------------")
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Artist-name: " + JSON.stringify(data.tracks.items[i].artists[0].name));
            console.log("Preview link of song: " + data.tracks.items[i].href);
            console.log("Album: " + JSON.stringify(data.tracks.items[i].album.name, null, 2));

        }
    });
}
function getMovieInfo(movieName) {
    omdb.byId({
        imdb: '',
        title: movieName,
        type: 'movie',
        year: '',
        plot: 'full',
        tomatoes: true
      }).then(res => console.log(res))
        .catch(err => console.error(err))

        console.log(JSON.stringify(res.Title) + " " + JSON.stringify(omdb[0].Year) + " Rated" + JSON.stringify(omdb[0].Rated)  + " tomato Rating: " + JSON.stringify(omdb[0].tomatoRating));

    // omdb.bySearch({
    //     search: movieName,
    //     type: 'movie',
    //     page: 1
    //   }).then(res => console.log(res))
    //     .catch(err => console.error(err))

    
}