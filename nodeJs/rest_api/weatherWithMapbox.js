const request = require('request');

const mapboxToken = 'pk.eyJ1IjoiZ2FldHoiLCJhIjoiY2s1cDdlcG8xMHQyYjNmbnN0YjJhcmNqeiJ9.kLu5p2ln7vq0X7CyQARZfQ';
const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Montpellier.json?&language=fr&access_token=';
// mapbox documentation: https://docs.mapbox.com/api.search

let latitude = 0.0;
let longitude = 0.0;

/* #2 - A heavier code to handle different types of errors
request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
        console.log("Unable to connect to weather API");
    } else if (response.body.error) {
        console.log("Unable to find location");
    } else {
        latitude = response.body.features[0].center[1];
        longitude = response.body.features[0].center[0];

        console.log("Longitude: " + longitude + " | Latitude: " + latitude);
    }
});
*/

// #3 - Chaining requests - a former method
// Create one function for each request, taking two arguments:
//      data that we provide for the request
//      callback
function functionName(data, callback) {
    url = createUrlFromData(data);
    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Server not reached error"); // One argument: call the error part, we chain the error
        } else if (response.error) {
            callback("Server error"); // One argument
        } else {
            newData = buildNewDataFromResponse(response);
            callback(error, newData); // Two arguments: call the response part
        }
    });
};