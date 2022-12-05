const express = require('express');
const { restart } = require('nodemon');
require('./db/mongoose');

const Player = require('./models/player')
const Quest = require('./models/quest')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const playerRouter = require('./routers/player')
app.use(playerRouter)
const questRouter = require('./routers/quest')
app.use(questRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
});