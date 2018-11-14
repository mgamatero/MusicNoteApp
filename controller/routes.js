var Music = require('../model/music');
var _ = require ('lodash')
var mongoose = require('mongoose') 


module.exports = function (app) {
    

app.post('/music', (req, res) => {
    var body = _.pick(req.body, ['text', 'artist','notes', 'link']); //only takes these properties, not completedAt
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
    Music.find().then((music) => {
        res.json(music)
    }, (e) => {
        res.status(400).send()
    })
})


app.get('/music/:id', (req, res) => {
    Music.findOne({ _id:req.params.id}).then((music) => {
        res.json(music)
    }, (e) => {
        res.status(400).send()
    })
})

// app.get('/music/?id', (req, res) => {
//     var convertedID = mongoose.Types.ObjectId(req.params.id)
//     // var convertedID = mongoose.Types.ObjectId(req.params.id)

//     if (!ObjectID.isValid(req.params.id)) {
//         return res.status(404).send()
//     }
    
//     Music.find({}).then((music) => {
//         if (!music) {
//             console.log('Die here')
//             return res.status(404).send()
//         }
//         res.json(music)
//     }, (e) => {
//         res.status(400).send()
//     })
// })


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
