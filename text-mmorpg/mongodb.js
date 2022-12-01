const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'; // Database address
const databaseName = 'text-mmorpg';

MongoClient.connect(connectionURL, { useNewURLParser:true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database')
    }
    console.log('Connected to database')
    const db = client.db(databaseName)
    db.collection('players').insertMany([
        {
            name: 'Gaëtan',
            level: 34,
            acceptPvp: false
        }, {
            name: 'Tan',
            level: 5,
            acceptPvp: true
        }, {
            name: 'Angèle',
            level: 23,
            acceptPvp: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert player');
        }
        console.log(result.ops);
    });

    db.collection('players').find({acceptPvp: true}).count((error, count) => {
        console.log(count);
    });
});