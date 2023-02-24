import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'


const Login=({ loginCallback }) => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState(null)
  const [messageType,setMessageType]=useState(null)


  const userLogin=async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, 
        password
      })
      loginCallback(user)
      blogService.setToken(user.token)
      localStorage.setItem('userInfo',JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  return(
    <div>
      <h2>log in to application</h2>
      <Notification message={message} messageType={messageType}/>
      <form onSubmit={userLogin}>
        <div>
            username
          <input
            id="username"
            messageType="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            messageType="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" messageType="submit">login</button>
      </form>
    </div>
  )
}

export default Login