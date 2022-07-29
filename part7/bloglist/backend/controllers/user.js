const userRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { json, response } = require('express')

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
    }

}

userRouter.post('/api/users', async (req,res,next) => {
    const password = req.body.password
    const username = req.body.username
    const name =  req.body.name


    const passHash = await bcrypt.hash(password, 10)
    const user_data = {
        username: username,
        passwordHash: passHash,
        name:name
    }
    try {
        if( password.length < 3)
            throw new ValidationError( 'Password should be at least 3 letter' )
        const userObj = new User(user_data)

        const result = await userObj.save()
        res.status(201).json(result)
    } catch (e) {
        next(e)
    }


})
userRouter.get('/api/users', async (req, res, next) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})
module.exports = userRouter