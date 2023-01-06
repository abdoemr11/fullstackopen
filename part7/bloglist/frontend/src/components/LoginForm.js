import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logginUser } from '../reducers/loggedUserReducer'
// import '../index.css'
// eslint-disable-next-line no-unused-vars
// import styles from '../index.css'
export function LoginForm() {
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(logginUser(username, password))

  }
  return <div
    data-cy={'login-form'}
    className='container flex flex-col mx-auto h-96 w-full'
  >
    <h2 className='text-mainBlue text-4xl text-center my-4 p-6'>Login to application</h2>
    <form className='flex flex-col mx-auto border-2 border-red rounded-lg grow px-16 justify-center'
      action=""
      onSubmit={handleLogin}
    >
      {/* <label htmlFor="Username">username</label> */}
      <input type="input"
        name="Username"
        id="username"
        placeholder='username'
        className='placeholder:text-mainBlue-100  p-x-2 border-8 border-gray-800 rounded-lg '
        onChange={(e) => setUserName(e.target.value)}
      />
      <br/>
      {/* <label htmlFor="Password">password</label> */}
      <input type="password"
        name="Password"
        id="password"
        placeholder='password'
        className='placeholder:text-mainBlue-100  p-x-2 border-2 rounded-lg'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit"
        className='w-full my-2  '
        id="login-button"/>
    </form>
  </div>
}