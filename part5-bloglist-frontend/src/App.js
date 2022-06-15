import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from "./services/login";
import axios from "axios";
import {Notification} from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  const[newTitle, setNewTitle] = useState('');
  const[newAuthor, setNewAuthor] = useState('');
  const[newUrl, setNewUrl] = useState('');
  const[notfi, setNotifi] = useState();
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
      setNotifi({type: "Success", msg:"You Logged In successfully"});
      setTimeout(()=>{setNotifi(undefined)},3000)
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
    } catch (e) {
      setNotifi({type:"Error", msg:e.response.data.error})
      setTimeout(()=>{setNotifi(undefined)},3000)

    }
  }
  const handleLogout = () => {
    localStorage.removeItem('user')
    setNotifi({type: "Success", msg:"You Logged Out"});
    setTimeout(()=>{setNotifi(undefined)},3000)
    setUser(undefined)
  }

  const handleCreateBlog = async () =>{

    try {
      blogService.setToken(user.token)
      console.log(newTitle)
      await blogService.create({title: newTitle, author: newAuthor, url: newUrl});
      console.log('created new blog successuflly');
      setNewUrl('');
      setNewAuthor('');
      setNewTitle('');
    } catch (e) {
      console.log(e.response)
    }
  }

  return (
    <div>
      <Notification notification={notfi}/>
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

            {/*create new blog form*/}
          <div>
            <h2>Create New </h2>
            title:
            <input type="text"
                   onChange={({target})=>setNewTitle(target.value)}

            />
            <br/>
            author:
            <input type="text"
                   onChange={({target})=>setNewAuthor(target.value)}

            />
            <br/>
            url:
            <input type="text"
                   onChange={({target})=>setNewUrl(target.value)}

            />
            <br/>
            <button onClick={handleCreateBlog}>create</button>
          </div>
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
