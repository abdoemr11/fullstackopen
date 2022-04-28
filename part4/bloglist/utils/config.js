require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGDODB_URI
    : process.env.MONGDODB_URI

module.exports = {
    PORT,
    MONGO_URL
}