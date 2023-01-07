import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate  } from 'react-router-dom'
import { addNewComment, removeBlog, updateBlog } from '../reducers/BlogReducer'
import { useState } from 'react'
import { UserAvatar } from '../components/UserAvatar'
import { MyButton } from '../components/MyButton'

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
    setCommentInput('')
  }

  if(blog)
    return (
      <div className='container border-2 border-mainBlue mx-4 p-8 text-mainBlue'>
        <header className='flex mb-8'>
          <h1 className=' text-xl'>{blog.title}</h1>
          <UserAvatar user={blog.user}/>
          <button className='text-4xl text-red-500 font-bold ml-auto cursor-pointer'
            onClick={handleRemove}
          >&#x2715;</button>

        </header>
        <a className='text-lg italic font-bold' href={blog.url}>{blog.url}</a>
        <div>
          <span className='text-xl font-bold mr-3'>Likes</span>
          <span className='text-3xl font-bold mx-3 italic'>{blog.likes}</span>
          <MyButton
            btnText={'like'}
            onClick={() => handleUpdateBlogLike()}/>

        </div>
        <section>
          <i>Blog Author</i> {blog.author}
        </section>
        <footer className='container mt-16'>
          <h2 className='text-xl text-bold '>Comments</h2>
          <div className='relative mb-8'>
            <input className='w-full border-2 rounded-lg py-2'type="text" onChange={(e) => setCommentInput(e.target.value)}/>
            <MyButton className='absolute right-0' onClick={handleNewComment} btnText='comment'/>
          </div>
          {blog.comments.length?
            <ul>
              {blog.comments.map((com,k) => <li key={k}>{com}</li>)}

            </ul>
            : <p>{'This blog doesn\'t have any comments'}</p>
          }
        </footer>
      </div>
    )
  return(
    <Navigate  to={'/'}/>
  )
}