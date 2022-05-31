const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs, empty_list } = require('../utils/test_helper')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const api = supertest(app)
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
describe('total likes', () => {
    test('of empty list',() => {
        const blogs = []
        const result = listHelper.countLikes(blogs)
        expect(result).toBe(0)
    })
    test('list has only one blog ',() => {

        const result = listHelper.countLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('list has many blogs ',() => {


        const result = listHelper.countLikes(blogs)
        expect(result).toBe(36)
    })

})
describe('favoirte blogs', () => {
    test('empty list of blog', () => {
        let result = listHelper.favoriteBlog(empty_list)
        expect(result).toBe(null)
    })
    test('list has only one blog ',() => {

        const result = listHelper.favoriteBlog(listWithOneBlog)
        const expected_result = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expected_result)
    })
    test('list has many blogs ',() => {


        const expected_result = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        }
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(expected_result)
    })
})
describe('api testing',  () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        for (const blog of blogs) {
            const blogObj = new Blog(blog)
            await blogObj.save()
        }
    })
    test('the blog list has the right number of blogs', async () => {
        blogsResult = await api.get('/api/blogs')
        expect(blogsResult.body.length).toBe(blogs.length)

    })
    test('the unique identifier is named "id"', async () => {
        const blogResult = await api.get('/api/blogs')
        expect(blogResult.body[0]['id']).toBeDefined()
    })
    test('add new blog', async () => {
        const blog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }
        const result = await api.post('/api/blogs')
            .send(blog)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
        delete result.body.id
        expect(result.body).toEqual(blog)
        const allBlogs = await api.get('/api/blogs')
        expect(allBlogs.body.length).toBe(blogs.length+1)
    })
    test('title or url are missing', async () => {

        const blogMinusTitle = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }
        const blogMinusUrl = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
        await api.post('/api/blogs')
            .send(blogMinusTitle)
            .set('Accept', 'application/json')
            .expect(400)
        await api.post('/api/blogs')
            .send(blogMinusUrl)
            .set('Accept', 'application/json')
            .expect(400)
    })
    test('delete blog', async () => {
        const blogToBeDel = (await Blog.find({}))[0]
        await api
            .delete(`/api/blogs/${blogToBeDel.id}`)
            .expect(204)

    }, 10000)
    test('update  blog likes', async () => {
        let blogToBeUpdated = (await Blog.find({}))[0]
        blogToBeUpdated = blogToBeUpdated.toJSON()
        blogToBeUpdated.likes = 10
        console.log(blogToBeUpdated.id)
        const resultBlog = await api
            .put(`/api/blogs/${blogToBeUpdated.id}`)
            .send(blogToBeUpdated)
        console.log(resultBlog)
        expect(JSON.parse(resultBlog.text).likes).toBe(10)
    })

})