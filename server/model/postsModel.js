const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)