import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const getAllBlogs =async () => {
      setBlogs(await blogService.getAll())
    }
    getAllBlogs()
    const localUser = JSON.parse(localStorage.getItem('user'))
    if(localUser)
      setUser(localUser)
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(username, password)
    try {
      const loggedUser = await login.login({username, password})
      console.log(loggedUser)
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
    } catch (e) {
      console.log(e.response.data)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }
  return (
    <div>
      {!user
          ?
          <div>
            <h2>Login to application</h2>
            <form action=""
                  onSubmit={handleLogin}
            >
              <label htmlFor="Username">username</label>
              <input type="input"
                     name="Username"
                     onChange={({target})=>setUserName(target.value)}
              />
              <br/>
              <label htmlFor="Password">password</label>
              <input type="password"
                     name="Password"
                     onChange={({target})=>setPassword(target.value)}
              />
              <input type="submit"/>
            </form>
          </div>
          :
          <div>
            {`${user.name} logged In`}
            <button onClick={handleLogout}>Log out</button>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
          </div>

      }



    </div>
  )
}

export default App
