const request = require('request');

const mapboxToken = 'pk.eyJ1IjoiZ2FldHoiLCJhIjoiY2s1cDdlcG8xMHQyYjNmbnN0YjJhcmNqeiJ9.kLu5p2ln7vq0X7CyQARZfQ';
const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Montpellier.json?&language=fr&access_token=';
// mapbox documentation: https://docs.mapbox.com/api.search

request( {url: url}, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.currently);
    //console.log("Montpellier's position:\r\tlat: " + data.currently.latitude + "\r\tlong: " + data.currently.longitude);
});