const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    const passIsCorrect = !user ? false
        :await bcrypt.compare(password, user.passwordHash)
    if(!passIsCorrect) {
        return res.status(400).json({ error: 'invalid username or password' })
    }
    const userForToken = {
        username : user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200)
        .send({ token, username : user.username, name:user.name })
})

module.exports = loginRouter