const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    favoriteGenre: String
})

module.exports = mongoose.model('User', userSchema)