const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Publication = new Schema({
    User: {
        type: Object,
        required: true
    },
    date_create: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
        maxLength: 200
    },
    image: {
        type: String
    },
    reactions: [{
        type: String
    }],
    comments: [{
        type: String,
        content: String,
        date: Date
    }]

})