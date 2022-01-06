const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
	_id: '60b8850d6775eb5450a553ad',
    username: 'root',
	name: 'root',
    passwordHash: '$2b$10$/Vw32UQzq7GX3L2FMqrSMede3s.PnAZ521eDmmscG/fu8PG06O9qi',
    blogs: ['5a422a851b54a676234d17f7','5a422aa71b54a676234d17f8']
  },
  {
	_id: '60b8850d6775eb5450a553ae',
    username: 'tTestaaja',
    name: 'Teppo Testaaja',
    passwordHash: '$2b$10$Y8PaANoSMpKHAPGyLdY09ed9c.wKkY.J0Pl8mjuDrAcuKzXblsTp2',
	blogs: ['5a422b3a1b54a676234d17f9','5a422ba71b54a676234d17fb']
  },
  {
	_id: '60b8850d6775eb5450a553af',
    username: 'eEsimerkki',
    name: 'Erkki Esimerkki',
    passwordHash: '$2b$10$7ggUaB39kYHGWytHPOg/qe/ayvpDdqoyLAsw1Jl/X/61mnD9fvC7i',
	blogs: ['5a422b891b54a676234d17fa','5a422bc61b54a676234d17fc']
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
	user: initialUsers[0]._id,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
	user: initialUsers[0]._id,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
	user: initialUsers[1]._id,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
	user: initialUsers[2]._id,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
	user: initialUsers[1]._id,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
	user: initialUsers[2]._id,
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author:'supertest', url:'none' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs, blogsInDb, nonExistingId, initialUsers, usersInDb
}