const _ = require('lodash')

//dummy
const dummy = (blogs) => {
  return 1
}

//tykkäyksiä yhteensä
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

//eniten tykkäyksiä
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {
    const reducer = (max, item) => {
      return item.likes >= max.likes
        ? item
        : max
    }
    const current = blogs.reduce(reducer, blogs[0])

    return {
      'title': current.title,
      'author': current.author,
      'likes':current.likes
    }
  }
}

//kirjoittaja, jolla eniten blogeja
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {

    const byBlogs = _.maxBy(
      _.map(
        _.countBy(blogs, 'author'),
        (val, key) => ({
          author: key, blogs: val
        })), 'blogs')

    return {
      'author': byBlogs.author,
      'blogs': byBlogs.blogs
    }
  }
}

//kirjoittaja, jolla eniten tykkäyksiä
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {
    const reducer = (acc, item) => {
      return item.likes+acc
    }
    const byLikes = _.maxBy(_.chain(_.groupBy(blogs, 'author')).map((val, key) => ({ author: key, likes: val.reduce(reducer, 0) })).value(), 'likes')

    return {
      'author': byLikes.author,
      'likes': byLikes.likes
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}