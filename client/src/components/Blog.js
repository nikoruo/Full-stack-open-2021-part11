import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    backgroundColor: 'CornflowerBlue',
    borderRadius: 12
  }

  const [visible, setVisible] = useState(false)

  const addLike = () => {
    likeBlog({
      user:blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
  }

  const rmvBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author} <button className='sB' onClick={() => setVisible(!visible)}>{ visible ? 'hide' : 'view' }</button>
      </div>
      {visible ?
        <div>
          <ul>
            <li>{blog.url}</li>
            <li>likes {blog.likes} <button onClick={ addLike }>like</button></li>
            <li>{blog.user.name}</li>
          </ul>
          {user.username === blog.user.username ? <button className='dB' style={buttonStyle} onClick={rmvBlog}>remove</button> : null}
        </div>
        : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog