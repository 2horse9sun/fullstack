import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,refresh,likehandler }) => {
  const [thisBlog,setThisBlog]=useState(blog)
  const [showAll,setShowAll]=useState(false)

  useEffect(() => {
    setThisBlog(blog)
  },[blog])

  const deleteBlog = async () => {
    if(window.confirm(`Are you sure to delete ${blog.title}?`)){
      await blogService.remove(blog.id)
      refresh()
    }
  }

  const likeBlog = async () => {
    if(likehandler){
      likehandler()
    } else {
      const newBlog={...thisBlog,likes:thisBlog.likes+1}
      await blogService.update(newBlog.id,newBlog)
      setThisBlog(newBlog)
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
          <p>{thisBlog.title}</p> <p>{thisBlog.author}</p> <button onClick={() => setShowAll(!showAll)}>view</button>
        </div> 
        )
        : 
        (<div>
          <div>{thisBlog.title} {thisBlog.author} <button onClick={() => setShowAll(!showAll)}>hide</button></div>
          <div>{thisBlog.url}</div>
          <div>likes {thisBlog.likes} <button onClick={likeBlog}>like</button></div>
          <div>{thisBlog.user && thisBlog.user.name }</div>
          <button id="delete-button" onClick={deleteBlog}>DELETE</button>
        </div>
        ) 
      }
    </div>

  )

}

export default Blog