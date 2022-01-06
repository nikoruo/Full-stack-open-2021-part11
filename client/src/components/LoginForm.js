import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()

    loginUser({
      username, password,
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={ handleLogin }>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='submitLogin' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm