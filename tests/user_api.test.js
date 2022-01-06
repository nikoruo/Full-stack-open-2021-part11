const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)

    //const passwordHash = await bcrypt.hash('sekret', 10)
    //const user = new User({ username: 'root1', passwordHash })
    //await user.save()
  })

  //käyttäjätunnukseen liittyvät testit
  test('creation succeeds with a fresh and valid user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe('testing new user username', () => {
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is invalid', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'rt',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('User validation failed: username: Path `username` (`rt`) is shorter than the minimum allowed length (3).')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if username does not exist', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('User validation failed: username: Path `username` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  //salasanaan liittyvät testit
  describe('testing new user password', () => {
    test('creation fails with proper statuscode and message if password does not exist', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('User validation failed: password: Path `password` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if password is invalid', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'sa',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(`User validation failed: password: Path 'password' ('sa') is shorter than the minimum allowed length (3).`)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})