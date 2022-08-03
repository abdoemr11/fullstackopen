import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate  } from 'react-router-dom'
import { removeBlog, updateBlog } from '../reducers/BlogReducer'

export const BlogView = () => {
  const blogs = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const params = useParams()
  const blog = blogs.find(u => u.id === params.blogId)
  const user = useSelector(state => state.loggedUser)
  const handleUpdateBlogLike = () => {
    console.log('incrementing likes')
    console.log(blog)
    console.log('user', blog.user)
    dispatch(updateBlog({ ...blog, user: blog.user.id, likes: blog.likes+1 }))
  }
  const handleRemove = () => {
    // console.log(user)

    if(window.confirm('Are you sure you want to delete this blog'))
      dispatch(removeBlog(blog.id, user.token)
      )
  }
  if(blog)
    return (
      <div>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes}
          <button
            onClick={() => handleUpdateBlogLike()}>
            like</button>
        </p>
        <p>added by {blog.user.name}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    )
  return(
    <Navigate  to={'/'}/>
  )
}