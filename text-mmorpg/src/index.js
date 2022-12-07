const express = require('express');
const { restart } = require('nodemon');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const classRouter = require('./routers/class')
app.use(classRouter)
const playerRouter = require('./routers/player')
app.use(playerRouter)
const questRouter = require('./routers/quest')
app.use(questRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
});

const Player = require('./models/player')

// const testQ2P = async () => {
//     const player = await Player.findById('638e0b93eff54bc945c1289a')
//     await player.populate('currentQuest')
//     console.log(player.currentQuest)
// }
// testQ2P()