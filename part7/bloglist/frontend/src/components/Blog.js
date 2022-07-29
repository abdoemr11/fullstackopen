import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/BlogReducer'
const Blog = ({ blog, user }) => {
  const [isFullShow, setFullShow] = useState(false)
  const dispatch = useDispatch()
  let buttonText = isFullShow? 'hide': 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleRemove = () => {
    // console.log(user)

    if(window.confirm('Are you sure you want to delete this blog'))
      dispatch(removeBlog(blog.id, user.token)
      )
  }
  const handleUpdateBlogLike = () => {
    console.log('incrementing likes')
    console.log(blog)
    dispatch(updateBlog({ ...blog, user: blog.user.id, likes: blog.likes+1 }))
  }
  return(

    <div style={blogStyle} data-cy='blog'>
      <span>{blog.title}</span> By <span>{blog.author}</span>
      <button onClick={() => setFullShow(!isFullShow)}>{buttonText}</button>
      {
        isFullShow
          ?<div>
            <p>{blog.url}</p>
            <p>likes {blog.likes}
              <button
                onClick={() => handleUpdateBlogLike()}>
                    like</button></p>
            <p>{blog.user?.name}</p>
          </div>: ''

      }
      <button onClick={handleRemove}>remove</button>
    </div>
  )
}

export default Blog