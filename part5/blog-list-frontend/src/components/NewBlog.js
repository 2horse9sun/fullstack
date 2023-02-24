import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const NewBlog=({ addCallback }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const createBlog=async (event) => {
    event.preventDefault()
    const blog={
      title,
      author,
      url,
    }
    const res=await blogService.create(blog)
    addCallback(res)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form>
      <div>
            title
        <input
          id="title"
          type="text"
          value={title}
          name="Username"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author
        <input
          id="author"
          type="text"
          value={author}
          name="Username"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url
        <input
          id="username"
          type="text"
          value={url}
          name="Username"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-button" onClick={createBlog}>create</button>
    </form>
  )
}

export default NewBlog