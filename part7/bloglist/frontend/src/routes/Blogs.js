
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from 'boring-avatars'

export const Blogs = () => {
  const blogs = useSelector(state => state.blog)
  console.log(blogs)
  return(
    <div className='container border-2 border-mainBlue mx-4 p-8'>

      { blogs.map(blog =>
        <div className=' border border-mainBlue m-4 p-4'
          key={blog.id}
        >
          <Link className='flex '
            to={`blogs/${blog.id}`}
          >
            {blog.title }
            <span className='text-xl'> &ensp; By &emsp;</span>
            <Avatar name={blog.user}
              variant="beam"
            />
          </Link>
        </div>
      )
      }
    </div>
  )
}