const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    console.log('Getting all blogs')
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)

})

blogRouter.post('/', async (request, response, next) => {
    const blog = request.body
    //check if the blog contain the required attributes
    //verify that user is logged in


    if(!request?.user?.id) {

        return response.status(401).json({ error: 'token missing or invalid' })
    }

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
        const user =await User.findById(request.user.id)
        blog.user = user._id
        //if no likes is defined define the likes to be zero
        if(!blog.hasOwnProperty('likes'))
            blog['likes'] = 0
        const blogObj = new Blog(blog)
        const resultBlog = await blogObj.save()
        console.log(user)
        if(!user.blogs)
            user.blogs = [resultBlog]
        else
            user.blogs = user.blogs.concat(resultBlog)
        await user.save()
        response.status(201).json(resultBlog)
    } else {
        response.status(400).end()
    }


})
blogRouter.delete('/:id', async (request, response,next) => {
    try {
        const user = request.user
        console.log(user)
        const blog = await Blog.findById(request.params.id)
        console.log(blog)
        if(!user?.id || blog.user.toString() !== user.id.toString()) {
            return response.status(401).json({ error: 'You don\'t have permision to delete this blog' })
        }
        await blog.deleteOne()
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})
blogRouter.put('/:id', async (request, response, next) => {
    const blog = request.body
    //check if the blog contain the required attributes
    console.log('printing the blog',blog)
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
        console.log('before updating')
        try {
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            console.log('updated blog',updatedBlog)
            response.json(updatedBlog)
        } catch (e) {
            console.log(e)
            next(e)
        }

    } else {
        response.status(400).end()
    }
})
blogRouter.post('/:id/comment', async (request, response, next) => {
    console.log('hitting here')
    if(!request?.user?.id) {

        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const comment = request.body
    console.log(comment.comment)
    try {
        const blog = await  Blog.findById(request.params.id)
        if(blog.comments)
            blog.comments = blog.comments.concat(comment.comment)
        else
            blog.comments = [comment.comment]
        const resultComment = await blog.save()
        response.status(201).json(resultComment)
    } catch (e) {
        next(e)
    }


    // if(!user.blogs)
    //     user.blogs = [resultBlog]
    // else
    //     user.blogs = user.blogs.concat(resultBlog)
    // await user.save()
})
module.exports = blogRouter