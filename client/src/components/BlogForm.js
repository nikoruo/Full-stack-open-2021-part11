import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, user }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      user: user.id
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form id='form' onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogForm