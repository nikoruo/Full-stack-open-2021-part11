const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined || body.password.length === 0) {

    response.status(400).json({
      error: 'User validation failed: password: Path `password` is required'
    })

  } else if (body.password.length < 3) {

    response.status(400).json({
      error: `User validation failed: password: Path 'password' ('${body.password}') is shorter than the minimum allowed length (3).`
    })

  } else {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

module.exports = usersRouter