// Read and set any environmnet variables with dotenv package
require("dotenv").config();

//Import keys.js and store in a variable 
// import './keys';
// import keys from './keys';

import * as keys from '/keys.js';

var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

//Take in commands and process accordingly

var operation = process.argv[2];


console.log(operation);
if (operation === "my-tweets"){
    console.log("my-tweets");
}
else if (operatrion === "spotify-this-song"){
    console.log("spotify-this-song");

}
else if (operatrion === "movie-this"){
    console.log("movie-this");

}
else if (operatrion === "do-what-it-says"){
    console.log("do-what-it-says");

}


