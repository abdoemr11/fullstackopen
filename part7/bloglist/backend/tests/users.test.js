const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
describe('Create New Users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })
    test('register new Users', async () => {
        const user = {
            name: 'abdo',
            username: 'abdosadf',
            password: 'passs'
        }
        let result = await api.post('/api/users')
            .send(user)
            .expect(201)
    })
    test('username is less than 3 letters should be error', async () => {
        const user = {
            name: 'a',
            username: 'a',
            password: 'passs'
        }
        let result = await api.post('/api/users')
            .send(user)
            .expect(400)
    })
    test('username should be unique', async () => {
        const user = {
            name: 'abdo',
            username: 'abdosadf',
            password: 'passs'
        }
        await api.post('/api/users')
            .send(user)
        await api.post('/api/users')
            .send(user)
            .expect(400)
    })
    test('Password should be greater than 3 letter', async () => {
        const user = {
            name: 'abdo',
            username: 'abdosadf',
            password: '1'
        }
        await api.post('/api/users')
            .send(user)
            .expect(400)
    })
})
