const express = require('express')
const bodyParser = require('body-parser')
const { randomByte, randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = 't' //randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = { id, title }

    console.log('Worked?')

    res.status(201).send(posts[id])
})

app.listen(4000, () => {
    console.log('Posts server listening on 4000')
})