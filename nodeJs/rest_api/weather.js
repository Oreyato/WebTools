// Weather with mapbox + darksky

const request = require('request');

const mapboxToken = 'pk.eyJ1IjoiZ2FldHoiLCJhIjoiY2s1cDdlcG8xMHQyYjNmbnN0YjJhcmNqeiJ9.kLu5p2ln7vq0X7CyQARZfQ';
const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Montpellier.json?&language=fr&access_token=' + mapboxToken;
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

        console.log("Montpellier location:")
        console.log("\tLongitude: " + longitude + "\n\tLatitude: " + latitude);
    }
});
*/

/*
// #3 - Chaining requests - a former method
// Create one function for each request, taking two arguments:
//      data that we provide for the request
//      callback
function functionName(data, callback) {
    url = createUrlFromData(data);
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Server not reached error"); // One argument: call the error part, we chain the error
        } else if (response.error) { // Depends the API
            callback("Server error"); // One argument
        } else {
            newData = buildNewDataFromResponse(response);
            callback(error, newData); // Two arguments: call the response part
        }
    });
};
*/

function cityLocation(city, callback) {
    // -Les URI sont la technologie de base du World Wide Web car tous les hyperliens du Web sont exprimés sous forme d'URI-
    const encodedCity = encodeURIComponent(city);
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodedCity + '.json?&language=fr&access_token=' + mapboxToken;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to geocode API");
        } else if (response.body.error) { 
            callback("Unable to find location"); 
        } else {
            latitude = response.body.features[0].center[1];
            longitude = response.body.features[0].center[0];
    
            const data = {latitude, longitude}; // Shortcut for { latitude: latitude, longitude: longitude }

            console.log("Météo à " + city + ":");
            /*
            console.log(city + "'s location:");
            console.log("\tLongitude: " + longitude + "\n\tLatitude: " + latitude);
            */

            callback(error, data);
        }
    });
}

function displayWeather(data, callback) {
    const url = 'https://api.darksky.net/forecast/ad95e11dbf8fe6961a05425dea338c24/' + data.latitude + "," + data.longitude + '?units=si&lang=fr';

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather API");
        } else if (response.body.error) {
            callback("Unable to find location\'s weather");
        } else {
            // Destructuring to create the two variables
            const {temperature, precipProbability} = response.body.currently; 
            /// It is equivalent to
            /// const temperature = response.body.currently.temperature;
            /// const precipProbability = response.body.currently.precipProbability

            callback(undefined, response.body.daily.data[0].summary + " Il fait actuellement " + temperature + '°C et il y a ' + precipProbability + "% de chance qu'il pleuve");
        }
    });
}

// Chaining functions
function weather(city, callback) {
    cityLocation(city, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        displayWeather(data, callback);
    });
}

weather('Londres', (error, data) => {
    console.log(data);
});