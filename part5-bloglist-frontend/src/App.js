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
  }, [])
  const handleLoginUser = async (e) => {
    e.preventDefault()
    console.log(username, password)
    try {
      const user = await login.login({username, password})
      console.log(user)
      setUser(user)
    } catch (e) {
      console.log(e.response.data)
    }
  }
  return (
    <div>
      {!user
          ?
          <div>
            <h2>Login to application</h2>
            <form action=""
                  onSubmit={handleLoginUser}
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
