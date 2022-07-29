import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { addNotification } from './notificationReducer'

const blogSlicer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      return state.concat(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    }
  }

})
export const getAllBlog = () => {
  return async dispatch =>  {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const removeBlog = (id, token) => {
  return async dispatch => {
    try {
      blogService.setToken(token)
      await blogService.remove(id)
      dispatch(deleteBlog(id))
    } catch (e) {
      console.log(e)
      dispatch(addNotification({ type:'Error', msg:e.response.data.error }))
    }
  }
}
export const createNewBlog = (newTitle,newAuthor, newUrl, token) => {
  return async dispatch => {
    console.log(`${newTitle }     ${newAuthor}     ${newUrl}`)

    try {
      blogService.setToken(token)
      const result = await blogService.create({ title: newTitle, author: newAuthor, url: newUrl })
      console.log(result)
      dispatch(appendBlogs(result))
      dispatch(addNotification({ type: 'Success', msg:'You Created a blog' }))


    } catch (e) {
      console.log(e.response)
    }
  }
}
export default blogSlicer.reducer
export const { setBlogs, appendBlogs, deleteBlog }  = blogSlicer.actions