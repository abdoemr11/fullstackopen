const Blog = require('../models/blog')
const { response } = require('express')
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

    const mustHaveProps = ['title', 'author', 'url']
    let isValidBlog = true
    for (let p of mustHaveProps) {
        if(!blog.hasOwnProperty(p)) {
            isValidBlog = false
            //TODO remove for testing only
            break
        }
    }
    if(isValidBlog) {
        //if no likes is defined define the likes to be zero
        if(!blog.hasOwnProperty('likes'))
            blog['likes'] = 0
        const blogObj = new Blog(blog)
        const result = await blogObj.save()
        response.status(201).json(result)
    } else {
        response.status(400).end()
    }

})
blogRouter.delete('/api/blogs/:id', async (request, response,next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})
blogRouter.put('/api/blogs/:id', async (request, response, next) => {
    const blog = request.body
    //check if the blog contain the required attributes

    const mustHaveProps = ['title', 'author', 'url', 'likes', 'id']
    let isValidBlog = true
    for (let p of mustHaveProps) {
        if(!blog.hasOwnProperty(p)) {
            isValidBlog = false
            //TODO remove for testing only
            break
        }
    }
    if(isValidBlog) {

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        console.log(updatedBlog)
        response.json(updatedBlog)
    } else {
        response.status(400).end()
    }
})
module.exports = blogRouter