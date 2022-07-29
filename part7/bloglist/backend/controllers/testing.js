const Blog = require('../models/blog')
const User = require('../models/user')
const testingRouter = require('express').Router()
require('dotenv').config()
testingRouter.post('/reset', async (req, res) => {
    if(process.env.NODE_ENV === 'test') {
        await Blog.deleteMany({})
        await User.deleteMany({})
    }
    res.status(402).end()
})

module.exports =  testingRouter