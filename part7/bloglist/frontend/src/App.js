import {  useEffect } from 'react'
import { Notification } from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/loggedUserReducer'
import { LoginForm } from './components/LoginForm'
import { Link, Route, Routes } from 'react-router-dom'
import { Users } from './routes/Users'
import { User } from './routes/User'
import { Blogs } from './routes/Blogs'
import { getAllUsers } from './reducers/usersReducer'
import { getAllBlog } from './reducers/BlogReducer'
import { BlogView } from './routes/BlogView'
import './index.css'
import Logo from './components/Logo'
import Avatar from 'boring-avatars'
import { MyButton } from './components/MyButton'
import Toggable from './components/Toggable'
import { NewBlogForm } from './components/NewBlogForm'


const App = () => {

  const dispatch = useDispatch()
  const notfi = useSelector(state => state.notification)
  const user = useSelector(state => state.loggedUser)


  useEffect(() => {
    dispatch(getAllUsers())
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


  // There is an obvious logic error here
  // When we press the like button we must keep track of who liked the blog
  // Hence in the database there should be somekind of many to many relationship
  // between the users and the posts they liked



  return (
    <div>
      <Notification notification={notfi}/>
      {!user
        ?
        <LoginForm />
        :
        <>

          <div>
            <div className='container'>
              <header className=' flex gap-4 justify-between '>
                <Logo/>

                <div className='flex justify-between space-x-4 items-center'>
                  <div className='flex flex-col justify-center items-center'>
                    <Avatar name={user.name}
                      variant="beam"
                    />
                    {user.name}
                  </div>
                  <MyButton onClick={handleLogout} btnText={'Log out'}/>
                </div>
              </header>
              <div className='flex justify-start gap-64 p-4'>
                <Link className='text-xl text-mainBlue font-bold' to={'/'}>Blogs </Link>
                <Link className='text-xl text-mainBlue font-bold' to={'/users'}>Users </Link>
                <Toggable className='justify-self-end ml-auto'
                  buttonLabel={'new blog'}>
                  <NewBlogForm

                  />
                </Toggable>
              </div>
            </div>
            <Routes>
              <Route path='users' element={<Users/>}/>
              <Route path='users/:userId' element={<User/>}/>
              <Route path='/' element={<Blogs/>}/>
              <Route path='/blogs/:blogId' element={<BlogView/>}/>
            </Routes>
            {/*create new blog form*/}


          </div>
        </>


      }



    </div>
  )
}

export default App
