var Music = require('../model/music');
var _ = require('lodash')
var mongoose = require('mongoose')


module.exports = function (app) {


    app.post('/music', (req, res) => {
        var body = _.pick(req.body, ['text', 'artist', 'notes', 'link']); //only takes these properties, not completedAt
        var music = new Music({
            text: req.body.text,
            username: req.body.username,
            artist: req.body.artist,
            link: req.body.link,
            notes: req.body.notes,
            media: req.body.media
        })
        music.save().then((doc) =>
            res.send(doc))
    }, (e) => {
        res.status(400).send()
    })


    app.get('/music', (req, res) => {
        Music.find({ completed: "false" }).then((music) => {
            res.json(music)
        }, (e) => {
            res.status(400).send()
        })
    })

    app.get('/music/archived', (req, res) => {
        Music.find({ completed: "true" }).then((music) => {
            res.json(music)
        }, (e) => {
            res.status(400).send()
        })
    })


    app.get('/music/:id', (req, res) => {
        Music.findOne({ _id: req.params.id }).then((music) => {
            res.json(music)
        }, (e) => {
            res.status(400).send()
        })
    })



    app.post('/music/delete/:id', (req, res) => {

        Music.findOneAndRemove({ _id: req.params.id }).then((result) => {
            if (!result) {
                return res.status(404).send()
            }
            res.send({ result })
        })
    })


    app.post('/music/complete/:id', (req, res) => {

        Music.findOneAndUpdate({ _id: req.params.id },
            { $set: { completed: true } }).then((result) => {
                if (!result) {
                    return res.status(404).send()
                }
                res.send({ result })
            })
    })


    app.post('/music/activate/:id', (req, res) => {

        Music.findOneAndUpdate({ _id: req.params.id },
            { $set: { completed: false } }).then((result) => {
                if (!result) {
                    return res.status(404).send()
                }
                res.send({ result })
            })
    })


    //--------------------------------------------------------------------
    //THIS IS MEANT TO BE A PUT!!!!!!!!!!!!!!!!!!!!!!!!
    //--------------------------------------------------------------------
    app.post('/music/update/:id', (req, res) => {
        console.log(req)
        Music.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    text: req.body.text,
                    username: "Updatated now",
                    artist: req.body.artist,
                    link: req.body.link,
                    notes: req.body.notes,
                    media: req.body.media 
                }
            }
        ).then((result) => {
            if (!result) {
                return res.status(404).send()
            }
            res.send({ result })
        })
    })












    // app.patch('/music/:id', (req, res) => {
    //     var id = req.params.id;
    //     var body = _.pick(req.body, ['text', 'completed']); //only takes these properties, not completedAt

    //     //valid id?
    //     if (!ObjectID.isValid(req.params.id)) {
    //         return res.status(404).send()
    //     }

    //     //if boolean and completed = true
    //     if ((_.isBoolean) && body.completed) {
    //         body.completedAt = new Date().getTime();
    //     }
    //     else {
    //         body.completed = false;
    //         body.completedAt = null;
    //     }

    //     //actual update happens here
    //     //1st arg - id, 2nd is body, 3rd is a parameter that says return new updated obj
    //     Music.findByIdAndUpdate(id, { $set: body }, { new: true }).then((music) => {
    //         if (!music) {
    //             return res.status(404).send()
    //         }
    //         res.send({ music })
    //     }).catch((e) => {
    //         rest.statsus(400).send()
    //     })

    // });

}
