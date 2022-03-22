const request = require('request');
const url = 'https://api.darksky.net/forecast/ad95e11dbf8fe6961a05425dea338c24/43.3639,3.5238?units=si&lang=fr';
// list of query string options: https://darksky.net/dev/docs
// ^ needed to do the exercice

// request takes two arguments:
//      an object to set up the request
//      a callback function that takes two parameters:
//          error is passed when the server detects an error
//          response is the server valid response
request( {url: url}, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.currently);
    // console.log("It is currently " + data.currently.temperature + "°C out, and there is " + data.currently.precipProbability + "% risk of rain");   
});