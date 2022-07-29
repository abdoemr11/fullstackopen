const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./middleware')
const { userExtractor } = require('./middleware')
const testingRouter = require('./controllers/testing')


// eslint-disable-next-line no-undef
const mongoUrl = config.MONGO_URL

mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('connected successsfully')
    })
    .catch(err => logger.error(err.message))


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs',middleware.userExtractor,blogRouter)
app.use(userRouter)
app.use('/api/login', loginRouter)
if(process.env.NODE_ENV === 'test') {
    console.log('adding the testing router')
    app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
//TODO middleware for error handling
module.exports = app