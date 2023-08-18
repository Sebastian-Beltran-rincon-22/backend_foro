const mongoose = require('mongoose')

const Schema = mongoose.Schema

const interacSchema = new Schema({

    reactions: {
        type: Boolean,
        default: false
    },
    comments: {
        type: String,
        content: String,
        date: Date
    },
    shares:{
        type: String
    },
    
    publication:{
        ref: 'Publication',
        type: mongoose.Schema.Types.ObjectId

    }

},{versionKey:false})

module.exports = mongoose.model('Interactions',interacSchema)