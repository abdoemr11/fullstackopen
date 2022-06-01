const userRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
userRouter.post('/api/users', async (req,res,next) => {
    const password = req.body.password
    const passHash = await bcrypt.hash(password, 10)
    const user_data = {
        username: req.body.username,
        passwordHash: passHash,
        name: req.body.name
    }
    console.log(user_data)
    try {
        const userObj = new User(user_data)

        const result = await userObj.save()
        console.log(await User.find({}))
        res.status(201).json(result)
    } catch (e) {
        next(e)
    }


})
module.exports = userRouter