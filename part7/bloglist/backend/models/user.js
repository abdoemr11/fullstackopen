const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: [3, 'username must not be less than 3 letters'],

        unique: true
    },
    passwordHash: String,
    name: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User
