const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const userRouter = require('./controllers/user')
const middleware = require('./middleware')



// eslint-disable-next-line no-undef
const mongoUrl = config.MONGO_URL

mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('connected successsfully')
    })
    .catch(err => logger.error(err.message))


app.use(cors())
app.use(express.json())

app.use(blogRouter)
app.use(userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
//TODO middleware for error handling
module.exports = app