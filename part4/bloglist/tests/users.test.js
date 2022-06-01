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
})
