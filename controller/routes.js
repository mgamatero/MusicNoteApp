var Music = require('../model/music');
var _ = require('lodash')
var mongoose = require('mongoose')
// const mx = require('musixmatchlyrics')
var lyr = require('lyrics-fetcher')




module.exports = function (app) {


    //------------------------------------------------------------------------------------
    // Route that gets all songs with completed:FALSE.  These in effect are Active songs
    //------------------------------------------------------------------------------------
    app.get('/music', (req, res) => {
        Music.find({ completed: "false" }).then((music) => {
            res.json(music)
        }, (e) => {
            res.status(400).send()
        })
    })


    //------------------------------------------------------------------------------------
    // Route that gets all songs with completed:TRUE.  These in effect are Archived songs
    //------------------------------------------------------------------------------------
    app.get('/music/archived', (req, res) => {
        Music.find({ completed: "true" }).then((music) => {
            res.json(music)
        }, (e) => {
            res.status(400).send()
        })
    })


    //-----------------------------------------------------
    // Route that gets song based on ID
    //-----------------------------------------------------
    app.get('/music/:id', (req, res) => {
        Music.findOne({ _id: req.params.id }).then((music) => {
            res.json(music)
        }, (e) => {
            res.status(400).send()
        })
    })



    //-----------------------------------------------------
    // Route that deletes the song.  
    //-----------------------------------------------------
    app.post('/music/delete/:id', (req, res) => {
        Music.findOneAndRemove({ _id: req.params.id }).then((result) => {
            if (!result) {
                return res.status(404).send()
            }
            res.send({ result })
        })
    })

    //-----------------------------------------------------
    // Route to post new song
    //-----------------------------------------------------
    app.post('/music', (req, res) => {
        var body = _.pick(req.body, ['text', 'artist', 'notes', 'link']); //only takes these properties, not completedAt
        var music = new Music({
            text: req.body.text,
            username: req.body.username,
            artist: req.body.artist,
            link: req.body.link,
            notes: req.body.notes
        })
        music.save().then((doc) =>
            res.send(doc))
    }, (e) => {
        res.status(400).send()
    })

    //--------------------------------------------------------------------
    //Route that Updates song properties
    //--------------------------------------------------------------------
    app.post('/music/update/:id', (req, res) => {
        console.log(req)
        Music.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    text: req.body.text,
                    username: req.body.username,
                    artist: req.body.artist,
                    link: req.body.link,
                    notes: req.body.notes,
                }
            }
        ).then((result) => {
            if (!result) {
                return res.status(404).send()
            }
            res.send({ result })
        })
    })

    //-----------------------------------------------------
    // Route that sets the song completed attribute to true.  
    //-----------------------------------------------------
    app.post('/music/complete/:id', (req, res) => {
        Music.findOneAndUpdate({ _id: req.params.id },
            { $set: { completed: true } }).then((result) => {
                if (!result) {
                    return res.status(404).send()
                }
                res.send({ result })
            })
    })

    //-----------------------------------------------------
    // Route that sets the song completed attribute to false.  
    //-----------------------------------------------------
    app.post('/music/activate/:id', (req, res) => {
        Music.findOneAndUpdate({ _id: req.params.id },
            { $set: { completed: false } }).then((result) => {
                if (!result) {
                    return res.status(404).send()
                }
                res.send({ result })
            })
    })



    //-----------------------------------------------------------
    // Route that gets song lyrics.  Lyrics-fetcher npm used here
    //-----------------------------------------------------------

    app.get('/lyrics/:artist/:song', (req, res) => {
            lyr.fetch(req.params.artist, req.params.song, function (err, lyrics) {
            res.send(err || lyrics)
        });
    })

}
