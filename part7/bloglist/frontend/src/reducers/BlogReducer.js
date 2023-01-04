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
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    replaceBlog(state, action){
      // console.log(action.)
      return state.map(b => b.id === action.payload.id? action.payload : b)
    },
    // eslint-disable-next-line no-unused-vars
    sortBlogs(state, action) {
      state.sort((a,b) => b.likes - a.likes)
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
let sortTimeout
export const updateBlog = (updatedBlog) => {
  return async dispatch => {
    const newBlog = await blogService.update(updatedBlog)
    dispatch(replaceBlog(newBlog))
    clearTimeout(sortTimeout)
    sortTimeout = setTimeout(() => dispatch(sortBlogs()),3000)

    dispatch(addNotification({ type: 'Success', msg: `You have liked ${ newBlog.title } ` }))

  }
}
export const createNewBlog = (newTitle,newAuthor, newUrl, token) => {
  return async dispatch => {
    console.log(`${newTitle }     ${newAuthor}     ${newUrl}`)

    try {
      blogService.setToken(token)
      const result = await blogService.create({ title: newTitle, author: newAuthor, url: newUrl })
      console.log(result)
      dispatch(appendBlog(result))
      dispatch(addNotification({ type: 'Success', msg:'You Created a blog' }))


    } catch (e) {
      console.log(e.response)
    }
  }
}
export const addNewComment = (id,comment, token) => {
  return async dispatch => {
    console.log(token)
    blogService.setToken(token)

    const newBlog = await blogService.addComment(id,comment)
    dispatch(replaceBlog(newBlog))
  }
}
export default blogSlicer.reducer
export const { setBlogs, appendBlog, deleteBlog, replaceBlog, sortBlogs }  = blogSlicer.actions