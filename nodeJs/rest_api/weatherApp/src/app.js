const express = require('express');
const path = require('path');
const weatherLib = require('./weather');

const app = express();
// get will respond to GET http requests
// req and res stand for request and response
app.get("", (req, res) => {
    // We can only have one "res" at a time (will take the first one)
    res.send('Hello express');
    // Return html code
    // res.send('<h1>Weather</h1>');
    // Return JSON code
    // res.send({
    //     name: 'Gaëtan',
    //     age: 34
    // });
});

app.listen(4000, () => {
    console.log('Server has started on port 4000');
});