const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const logger = require('./utils/logger')




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

module.exports = app