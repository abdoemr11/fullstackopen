import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import { Notification } from './components/Notification'
import Toggable from './components/Toggable'
import { NewBlogForm } from './components/NewBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import { createNewBlog, getAllBlog } from './reducers/BlogReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const notfi = useSelector(state => state.notification)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    dispatch(getAllBlog())
    const localUser = JSON.parse(localStorage.getItem('user'))
    if(localUser)
      setUser(localUser)
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(username, password)
    try {
      const loggedUser = await login.login({ username, password })
      console.log(loggedUser)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      dispatch(addNotification({ type: 'Success', msg:'You Logged In successfully' }))

    } catch (e) {
      dispatch(addNotification({ type:'Error', msg:e.response.data.error }))

    }
  }
  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(addNotification({ type: 'Success', msg:'You Logged Out' }, 3))
    setUser(undefined)
  }

  const handleNewBlog =  (newTitle, newAuthor, newUrl) => {
    dispatch(createNewBlog(newTitle, newAuthor, newUrl, user.token))
  }
  // There is an obvious logic error here
  // When we press the like button we must keep track of who liked the blog
  // Hence in the database there should be somekind of many to many relationship
  // between the users and the posts they liked


  const blogFormRef = useRef()

  return (
    <div>
      <Notification notification={notfi}/>
      {!user
        ?
        <div
          data-cy={'login-form'}
        >
          <h2>Login to application</h2>
          <form action=""
            onSubmit={handleLogin}
          >
            <label htmlFor="Username">username</label>
            <input type="input"
              name="Username"
              id="username"
              onChange={({ target }) => setUserName(target.value)}
            />
            <br/>
            <label htmlFor="Password">password</label>
            <input type="password"
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <input type="submit" id="login-button"/>
          </form>
        </div>
        :
        <div>
          {`${user.name} logged In`}
          <button onClick={handleLogout}>Log out</button>

          {/*create new blog form*/}
          <Toggable buttonLabel={'new blog'}>
            <NewBlogForm createNewBlog={handleNewBlog}
              refs={blogFormRef}
            />
          </Toggable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}
              user={user}
            />
          )}
        </div>

      }



    </div>
  )
}

export default App
