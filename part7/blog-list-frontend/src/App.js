import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import { useSelector,useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'


const App = () => {
  const [user,setUser]=useState(null)
  const { message,type }=useSelector(state => state.notification)
  const blogs =useSelector(state => {
    return state.blogs})
  const dispatch=useDispatch()

  useEffect(() => {
    localStorage.getItem('userInfo') && setUser(JSON.parse(localStorage.getItem('userInfo')))
  }, [])

  useEffect(() => {
    if(user){
      blogService.setToken(user.token)
    }
  },[user])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const loginCallback=(user) => {
    setUser(user)
    blogService.setToken(user.token)
    dispatch(setNotification({ message:'logged successfully!!!',type:'info' },5))
  }

  const logoutCallback=() => {
    localStorage.removeItem('userInfo')
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} type={type}/>
      {!user && <Login loginCallback={loginCallback}></Login>}
      {user &&
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} has logged in  <button onClick={logoutCallback}>logout</button>
          </div>
          <Togglable buttonLabel={'create'}>
            <NewBlog/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
