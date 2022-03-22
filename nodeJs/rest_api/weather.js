const request = require('request');
const url = 'https://api.darksky.net/forecast/ad95e11dbf8fe6961a05425dea338c24/43.3639,3.5238';

// request takes two arguments:
//      an object to set up the request
//      a callback function that takes two parameters:
//          error is passed when the server detects an error
//          response is the server valid response
request( {url: url}, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.currently);
});