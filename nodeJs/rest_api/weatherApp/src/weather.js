// Weather with mapbox + darksky

const request = require('request');

const mapboxToken = 'pk.eyJ1IjoiZ2FldHoiLCJhIjoiY2s1cDdlcG8xMHQyYjNmbnN0YjJhcmNqeiJ9.kLu5p2ln7vq0X7CyQARZfQ';
// mapbox documentation: https://docs.mapbox.com/api.search

function cityLocation(city, callback) {
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
            const {temperature, precipProbability} = response.body.currently; 

            callback(undefined, response.body.daily.data[0].summary + " Il fait actuellement " + temperature + '°C et il y a ' + precipProbability*100 + "% de chance qu'il pleuve");
        }
    });
}

function displayJSONWeather(data, callback) {
    const {latitude, longitude} = data;
    const url = 'https://api.darksky.net/forecast/ad95e11dbf8fe6961a05425dea338c24/' + latitude + "," + longitude + '?units=si&lang=fr';

    request({url: url}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather API");
            return;
        } 
        const res = JSON.parse(response.body);
        if (res.error) {
            callback("Unable to find location\'s weather");
        } else {
            // const summary = res.daily.data[0].summary;
            // const {temperature, precipProbability} = res.currently; 
            // data = {summary, temperature, precipProbability};
            data = {summary: res.daily.data[0].summary, temperature: res.currently.temperature, precipProbability: res.currently.precipProbability};

            callback(undefined, data);
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
        displayJSONWeather(data, callback);
    });
}

weather('Darwin', (error, data) => {
    console.log(data);
});

module.exports = {
    weather: weather
};