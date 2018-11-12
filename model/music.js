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
        required: true,
        minlength: 1,
        trim:true
  },
    link: {
        type: String,
        required: false,
        trim:true, 
        default: "----"
    },
       notes: {
        type: String,
        required: false,
        trim:true,
        default: "----"
    },
    media: {  //gridFs in the future?
        type: String,
        required: false,
        trim:true,
        default: "----"
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