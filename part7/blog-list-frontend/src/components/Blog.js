import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlogs,updateBlogs,initializeBlogs } from '../reducers/blogReducer'

const Blog = ({ blog,likehandler }) => {
  const [showAll,setShowAll]=useState(false)

  const dispatch=useDispatch()

  const deleteBlog = async () => {
    if(window.confirm(`Are you sure to delete ${blog.title}?`)){
      dispatch(deleteBlogs(blog.id))
      dispatch(initializeBlogs())
    }
  }

  const likeBlog = async () => {
    if(likehandler){
      likehandler()
    } else {
      const newBlog={ ...blog,likes:blog.likes+1 }
      dispatch(updateBlogs(blog.id,newBlog))
      dispatch(initializeBlogs())
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className="blog">
      {!showAll ?
        (<div >
          <p>{blog.title}</p> <p>{blog.author}</p> <button onClick={() => setShowAll(!showAll)}>view</button>
        </div>
        )
        :
        (<div>
          <div>{blog.title} {blog.author} <button onClick={() => setShowAll(!showAll)}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={likeBlog}>like</button></div>
          <div>{blog.user && blog.user.name }</div>
          <button id="delete-button" onClick={deleteBlog}>DELETE</button>
        </div>
        )
      }
    </div>

  )

}

export default Blog