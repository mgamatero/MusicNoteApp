var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Music = new Schema ({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim:true
    },
    username: {
        type: String,
        minlength: 1,
        trim:true
    },
    artist: {
        type: String,
        required: false,
        trim:true,
        default: "Unknown artist"
  },
    link: {
        type: String,
        required: false,
        trim:true, 
        default: "No Link"
    },
       notes: {
        type: String,
        required: false,
        trim:true,
        default: "No Notes"
    },
       media: {  //gridFs in the future?
        type: Buffer,
        required: false,
        trim:true,
        default: "No Audio File"
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Music',Music)