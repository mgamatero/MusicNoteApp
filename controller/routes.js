var Music = require('../model/music');
var _ = require ('lodash')

module.exports = function (app) {
    

app.post('/music', (req, res) => {
    var body = _.pick(req.body, ['text', 'artist','notes', 'link']); //only takes these properties, not completedAt
    var music = new Music({
        text: req.body.text,
        artist: req.body.artist,
        notes: req.body.notes,
        link: req.body.link
    })
    music.save().then((doc) =>
        res.send(doc))
}, (e) => {
    res.status(400).send()
})


app.get('/music', (req, res) => {
    Music.find().then((music) => {
        res.send({music})
    }, (e) => {
        res.status(400).send()
    })
})

app.get('/music/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }

    Music.findById(req.params.id).then((music) => {
        if (!music) {
            return res.status(404).send()
        }


        res.send({ music })
    }, (e) => {
        res.status(400).send()
    })
})


app.delete('/music/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }


    Music.findByIdAndRemove(req.params.id).then((result) => {
        if (!result) {
            return res.status(404).send()
        }
        res.send({ result })
    }).catch((e) => {
        res.status(400).send()
    })
})

app.patch('/music/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); //only takes these properties, not completedAt

    //valid id?
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }

    //if boolean and completed = true
    if ((_.isBoolean) && body.completed) {
        body.completedAt = new Date().getTime();
    } 
    else 
    {
        body.completed = false;
        body.completedAt = null;
    }

    //actual update happens here
    //1st arg - id, 2nd is body, 3rd is a parameter that says return new updated obj
    Music.findByIdAndUpdate(id, { $set: body }, { new: true }).then((music) => {
        if (!music) {
            return res.status(404).send()
        }
        res.send({ music })
    }).catch((e) => {
        rest.statsus(400).send()
    })

});

}
