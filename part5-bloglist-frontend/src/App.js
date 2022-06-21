import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from "./services/login";
import {Notification} from "./components/Notification";
import Toggable from "./components/Toggable";
import {NewBlogForm} from "./components/NewBlogForm";
import blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  const [updated, setUpdated] = useState(false);
  const[notfi, setNotifi] = useState();
  useEffect(() => {
    const getAllBlogs =async () => {
      setBlogs( await blogService.getAll())
    }
    getAllBlogs()
    const localUser = JSON.parse(localStorage.getItem('user'))
    if(localUser)
      setUser(localUser)
  }, [])
  useEffect(()=>{
    sortBlogs()

  }, [updated])
  const sortBlogs = () => {
    const oldBlogs = [...blogs]
    console.log(oldBlogs)
    setBlogs(oldBlogs.sort((a,b)=> b.likes - a.likes))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(username, password)
    try {
      const loggedUser = await login.login({username, password})
      setNotifi({type: "Success", msg:"You Logged In successfully"});
      setTimeout(()=>{setNotifi(undefined)},3000)
      setUser(loggedUser)
      blogService.setToken(user.token)
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

  const createNewBlog = async (newTitle, newAuthor, newUrl) =>{
    console.log(`${newTitle }     ${newAuthor}     ${newUrl}`)
    console.log(blogFormRef)

    try {
      blogService.setToken(user.token);
      const result = await blogService.create({title: newTitle, author: newAuthor, url: newUrl});
      console.log(result)
      setBlogs(blogs.concat(result))
      setNotifi({type: "Success", msg:"You Created a blog"});
      setTimeout(()=>{setNotifi(undefined)},3000)


    } catch (e) {
      console.log(e.response)
    }
  }
  // There is an obvious logic error here
  // When we press the like button we must keep track of who liked the blog
  // Hence in the database there should be somekind of many to many relationship
  // between the users and the posts they liked
  const updateBlogLikes = async (updatedBlog) => {
    const newBlog = await blogService.update(updatedBlog);
    setBlogs(blogs.map(b=> b.id === newBlog.id? newBlog : b))
    setUpdated(!updated)
  }
  const blogFormRef = useRef();

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
          <Toggable buttonLabel={'new blog'}>
            <NewBlogForm createNewBlog={createNewBlog}
                          refs={blogFormRef}
            />
          </Toggable>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} />
            )}
          </div>

      }



    </div>
  )
}

export default App
