const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/api/blogs', async (request, response, next) => {
    const blog = request.body
    //check if the blog contain the required attributes

    const mustHaveProps = ['title', 'author', 'url', 'likes']
    let isValidBlog = true
    for (let p of mustHaveProps) {
        if(!blog.hasOwnProperty(p)) {
            isValidBlog = false
            //TODO remove for testing only
            break
        }
    }
    if(isValidBlog) {
        const blogObj = new Blog(blog)
        const result = await blogObj.save()
        response.status(201).json(result)
    } else {
        response.status(400).end()
    }

})
module.exports = blogRouter