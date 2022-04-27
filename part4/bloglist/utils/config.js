require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGDODB_URI

module.exports = {
    PORT,
    MONGO_URL
}