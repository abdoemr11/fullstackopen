import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate  } from 'react-router-dom'
import { addNewComment, removeBlog, updateBlog } from '../reducers/BlogReducer'
import { useState } from 'react'

export const BlogView = () => {
  const blogs = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const params = useParams()
  const blog = blogs.find(u => u.id === params.blogId)
  const user = useSelector(state => state.loggedUser)
  const [commentInput, setCommentInput] = useState('')
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

  const handleNewComment = () => {
    dispatch(addNewComment(blog.id, { comment: commentInput }, user.token))
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
        <p>added by {blog.user? blog.user.name: <del>no user</del>}</p>
        <button onClick={handleRemove}>remove</button>
        <div>
          <h2>Comments</h2>
          <input type="text" onChange={(e) => setCommentInput(e.target.value)}/>
          <button onClick={handleNewComment}>add comment</button>
          {blog.comments.length?
            <ul>
              {blog.comments.map((com,k) => <li key={k}>{com}</li>)}

            </ul>
            : <p>{'This blog doesn\'t have any comments'}</p>
          }
        </div>
      </div>
    )
  return(
    <Navigate  to={'/'}/>
  )
}