import {  useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import Toggable from './components/Toggable'
import { NewBlogForm } from './components/NewBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import { createNewBlog, getAllBlog } from './reducers/BlogReducer'
import { setUser } from './reducers/loggedUserReducer'
import { LoginForm } from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import { Users } from './routes/Users'



const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const notfi = useSelector(state => state.notification)
  const user = useSelector(state => state.loggedUser)


  useEffect(() => {
    dispatch(getAllBlog())
    const localUser = JSON.parse(localStorage.getItem('user'))
    if(localUser)
      dispatch(setUser(localUser))
  }, [])



  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(addNotification({ type: 'Success', msg:'You Logged Out' }, 3))
    dispatch(setUser(null))
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
        <LoginForm />
        :
        <>

          <div>
            {`${user.name} logged In`}
            <button onClick={handleLogout}>Log out</button>
            <Routes>
              <Route path='users' element={<Users/>}/>
              <Route path='/' element={
                <>
                  <Toggable buttonLabel={'new blog'}>
                    <NewBlogForm createNewBlog={handleNewBlog}
                      refs={blogFormRef}
                    />
                  </Toggable>
                  <h2>blogs</h2>
                  {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}

                    />
                  )}
                </>
              }/>
            </Routes>
            {/*create new blog form*/}


          </div>
        </>


      }



    </div>
  )
}

export default App
