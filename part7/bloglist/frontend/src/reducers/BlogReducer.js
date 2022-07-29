import { createSlice } from '@reduxjs/toolkit'
// import blogService from '../services/blogs'

const blogSlicer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    }
  }

})
// export const getAllBlog = () => {
//   return async dispatch =>  {
//     const blogs = await blogService.getAll()
//     dispatch(setBlogs(blogs))
//   }
// }
export default blogSlicer.reducer
export const { setBlogs }  = blogSlicer.actions