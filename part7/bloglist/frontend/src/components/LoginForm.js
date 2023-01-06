import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logginUser } from '../reducers/loggedUserReducer'
import Logo from './Logo'
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
    <Logo/>
    <form className='flex flex-col w-1/3 items-stretch mx-auto border-2 border-mainBlue rounded-lg grow px-16 justify-center'
      action=""
      onSubmit={handleLogin}
    >
      {/* <label htmlFor="Username">username</label> */}
      <input type="input"
        name="Username"
        id="username"
        placeholder='username'
        className='placeholder:text-mainBlue-100  px-4 border border-gray-800 rounded-lg border-mainBlue '
        onChange={(e) => setUserName(e.target.value)}
      />
      <br/>
      {/* <label htmlFor="Password">password</label> */}
      <input type="password"
        name="Password"
        id="password"
        placeholder='password'
        className='placeholder:text-mainBlue-100  px-4 border border-gray-800 rounded-lg border-mainBlue'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit"
        className='w-full mt-8 bg-mainBlue rounded-xl py-2 text-white cursor-pointer '
        id="login-button"/>
    </form>
  </div>
}