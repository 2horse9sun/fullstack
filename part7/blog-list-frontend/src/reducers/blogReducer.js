import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    addBlog(state, action){
      state.push(action.payload)
    },
    updateBlog(state, action){
      const { id,likes }=action.payload
      const blog=state.find(b => b.id===id)
      blog.likes=likes
    },
    deleteBlog(state, action){
      const { id }=action.payload
      const blog=state.find(b => b.id===id)
      state.splice(blog,1)
    }
  }
})

export const initializeBlogs=() => {
  return async dispatch => {
    const blogs=await blogService.getAll()
    dispatch(blogSlice.actions.setBlogs(blogs))
  }
}

export const createBlogs = (blog) => {
  return async dispatch => {
    console.log(blog,'createBlog')
    const response = await blogService.create(blog)
    dispatch(blogSlice.actions.addBlog(response))
  }
}

export const updateBlogs = (id, blog) => {
  return async dispatch => {
    const response = await blogService.update(id, blog)
    dispatch(blogSlice.actions.updateBlog(response))
  }
}


export const deleteBlogs = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(blogSlice.actions.deleteBlog(id))
  }
}



export const { setBlogs, addBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer