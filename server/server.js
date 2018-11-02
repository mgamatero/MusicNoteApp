//contains express and bodyparser, routes, app.listen
//requires mongoose, Todo and User from db and models


var express = require('express')
var bodyParser = require('body-parser')

// var path = require('path')

var { mongoose } = require('./db/mongoose')
var { Music } = require('../model/music')
var { ObjectID } = require('mongodb')


var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())


//Routes
require('../controller/routes')(app)
// require('../controller/html-routes')(app)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
