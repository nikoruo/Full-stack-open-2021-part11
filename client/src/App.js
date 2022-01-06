import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  //haetaan blogit
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  //tarkastetaan localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //sisäänkirjautuminen
  const handleLogin = async (userObject) => {
    console.log(`logging in with ${userObject.username} ${userObject.password}`)

    try {
      const user = await loginService.login(userObject)

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setErrorMessage({ message: `logged in, welcome ${user.name}`, color: 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      setUser(user)

    } catch (exception) {
      setErrorMessage({ message:'wrong username or password',color:'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //uloskirjautuminen
  const handleLogout = () => {
    console.log(`logging out, hope to see you again ${user.name}`)

    setErrorMessage({ message: `Logged out, see you again ${user.name}`, color: 'green' })
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)

    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //uuden blogin postaaminen
  const addBlogPost = async (blogObject) => {
    console.log(`creating new blog ${blogObject.title} by ${user.name}`)
    try {
      let blog = await blogService.postNew(blogObject)
      blog = { ...blog, user: user }
      blogFormRef.current.toggleVisibility()

      setErrorMessage({ message: `a new blog ${blog.title} by ${blog.author} added`, color: 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      setBlogs(blogs.concat(blog))

    } catch (exception) {
      setErrorMessage({ message: 'Error while adding a new blog, please try again', color: 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //lisätään blogille tykkäys
  const addLike = async (blogObject) => {
    console.log(`giving like to ${blogObject.title} by ${blogObject.author}`)
    try {
      const blog = await blogService.addLike(blogObject)

      setErrorMessage({ message: `You just liked ${blog.title} by ${blog.author}`, color: 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      console.log(blog)
      setBlogs(blogs.map(b => (b.id !== blogObject.id ? b : { ...blog, user: blogObject.user })))

    } catch (exception) {
      setErrorMessage({ message: 'Error while liking a blog, please try again', color: 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //poista blogi
  const removeBlog = async (blogObject) => {
    console.log(`removing blog ${blogObject.title} by ${blogObject.author}`)
    try {
      const blog = await blogService.removeBlog(blogObject.id)

      setErrorMessage({ message: `You just removed ${blogObject.title} by ${blogObject.author}`, color: 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      console.log(blog)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))

    } catch (exception) {
      setErrorMessage({ message: 'Error while removing a blog, please try again', color: 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //kirjautumisform
  const loginForm = () => {
    return (
      <LoginForm id='loginForm' loginUser={ handleLogin } />
    )
  }

  //blogiform
  const blogForm = () => (
    <div id='blogForm'>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogPost} user={user} />
      </Togglable>
      <p/>
      {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={addLike} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )

  return (
    <div>
      { errorMessage !== null && < Notification info={errorMessage} /> }
      {user === null ? loginForm() : blogForm()}
    </div>
  )

}

export default App