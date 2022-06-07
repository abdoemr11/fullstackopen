const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.name)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token =  authorization.substring(7)
    }

    next()
}
const userExtractor = (req, res, next) => {

}
module.exports = {
    unknownEndpoint, errorHandler, tokenExtractor, userExtractor
}