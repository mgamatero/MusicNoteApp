
var express = require('express')
var bodyParser = require('body-parser')
var lyr = require('lyrics-fetcher')




var { mongoose } = require('./db/mongoose')
var { Music } = require('../model/music')
var { ObjectID } = require('mongodb')




var app = express()
const port = process.env.PORT || 3000
var path = require('path')



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine', 'hbs' )  //for hbs
app.use(express.static(path.join(__dirname,'../public')))

const hbs = require('hbs')  //for hbs
hbs.registerPartials(path.join(__dirname,'../views/partials'))


//Routes
require('../controller/routes')(app)
require('../controller/html-routes')(app)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
