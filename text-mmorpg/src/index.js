const express = require('express');
const { restart } = require('nodemon');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const classRouter = require('./routers/class')
app.use(classRouter)
const itemRouter = require('./routers/item')
app.use(itemRouter)
const inventoryRouter = require('./routers/inventory')
app.use(inventoryRouter)
const playerRouter = require('./routers/player')
app.use(playerRouter)
const questRouter = require('./routers/quest')
app.use(questRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
});

const Player = require('./models/player')