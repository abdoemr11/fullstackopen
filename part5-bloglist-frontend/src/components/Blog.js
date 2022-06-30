import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateBlogLikes, removeBlog }) => {
  const [isFullShow, setFullShow] = useState(false)
  let buttonText = isFullShow? 'hide': 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleRemove = () => {
    if(window.confirm('Are you sure you want to delete this blog'))
      removeBlog(blog.id)
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
                onClick={() => updateBlogLikes({ ...blog, likes: blog?.likes+1, user: blog?.user?.id })}>
                    like</button></p>
            <p>{blog.user?.name}</p>
          </div>: ''

      }
      <button onClick={handleRemove}>remove</button>
    </div>
  )
}
Blog.propTypes = {
  updateBlogLikes: PropTypes.func.isRequired
}
export default Blog