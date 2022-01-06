const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

//kaikkien blogien hakeminen
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

//yksittäisen blogin hakeminen
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

//uuden blogin tekeminen
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = new Blog(request.body)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user

  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  }
})

//blogin poistaminen
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'unauthorized action' })
  }
})

//blogin tykkäysten muokkaaminen
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
  } else {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      id: body.id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.status(200).json(updatedBlog.toJSON())
  }
})

module.exports = blogsRouter