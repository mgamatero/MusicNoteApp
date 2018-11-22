
var express = require('express')
var bodyParser = require('body-parser')
var lyrics = require('node-lyrics')

// const mx = require('musixmatchlyrics')
 
// mx.autocomplete('Rolling in the Deep', songs =>  {
//     console.log(songs[0].url)
// })

var { mongoose } = require('./db/mongoose')
var { Music } = require('../model/music')
var { ObjectID } = require('mongodb')




var app = express()
const port = process.env.PORT || 3000
var path = require('path')



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'../public')))


//Routes
require('../controller/routes')(app)
require('../controller/html-routes')(app)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
