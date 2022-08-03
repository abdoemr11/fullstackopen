import Toggable from '../components/Toggable'
import { NewBlogForm } from '../components/NewBlogForm'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Blogs = () => {
  const blogs = useSelector(state => state.blog)
  console.log(blogs)
  return(
    <div>
      <Toggable buttonLabel={'new blog'}>
        <NewBlogForm

        />
      </Toggable>
      <h2>blogs</h2>
      { blogs.map(blog =>
        <div             key={blog.id}
        >
          <Link
            to={`blogs/${blog.id}`}
          >
            {blog.title }{blog.author}
          </Link>
        </div>
      )
      }
    </div>
  )
}