const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    passwordHash: String,
    name: String
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
