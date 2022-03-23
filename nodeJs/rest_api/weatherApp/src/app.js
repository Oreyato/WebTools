const express = require('express');
const path = require('path');
const weatherLib = require('./weather');

const app = express();

const publicStaticDir = path.join(__dirname, '../public');
app.use(express.static(publicStaticDir));

// get will respond to GET http requests
// req and res stand for request and response
// http://localhost:4000/
app.get('', (req, res) => {
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

// http://localhost:4000/help
app.get('/help', (req, res) => {
    res.sendFile(publicStaticDir + '/help.html');
})

// http://localhost:4000/weather
app.get('/weather', (req, res) => {
    const weather = weatherLib.weather('Darwin', (error, data) => {
        console.log(data);
        res.status(200).send(data); // status function send a status code to the client. 200 means a 'OK' status
    }); 
});

// Wrong adress - error 404
app.get('*', (req, res) => {
    res.status(404).send('This page does not exists');
});

app.listen(4000, () => {
    console.log('Server has started on port 4000');
});