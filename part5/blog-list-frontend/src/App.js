import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

const likeCompare=(a,b) => {
  if(!a.likes){
    a.likes=0
  }else if(!b.likes){
    b.likes=0
  }
  return b.likes-a.likes
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)
  const [message,setMessage]=useState(null)
  const [messageType,setMessageType]=useState(null)

  useEffect(() => {
    localStorage.getItem('userInfo') && setUser(JSON.parse(localStorage.getItem('userInfo')))
  }, [])

  useEffect(() => {
    if(user){
      blogService.setToken(user.token)
    }
  },[user])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs=blogs.sort(likeCompare)
      setBlogs(blogs)
    })
  }, [])

  const loginCallback=(user) => {
    setUser(user)
    blogService.setToken(user.token)
    setMessage('logged successfully!!!')
    setMessageType('info')
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  const addCallback=(blog) => {
    const { title, author } = blog
    setMessage(`a new blog ${title} by ${author} added`)
    setMessageType('info')
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)

    blogService.getAll().then(blogs => {
      blogs=blogs.sort(likeCompare)
      setBlogs(blogs)
    }
    )
  }

  const refresh=() => {
    blogService.getAll().then(blogs => {
      blogs=blogs.sort(likeCompare)
      setBlogs( blogs )
    })
  }

  const logoutCallback=() => {
    localStorage.removeItem('userInfo')
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} messageType={messageType}/>
      {!user && <Login loginCallback={loginCallback}></Login>}
      {user &&
        <div>
          <h2>blogs</h2>
          <div> 
            {user.name} has logged in  <button onClick={logoutCallback}>logout</button>
          </div>
          <Togglable buttonLabel={'create'}> 
            <NewBlog addCallback={addCallback}/> 
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} refresh={refresh} />
          )}
        </div>
       }
    </div>
  )
}

export default App
