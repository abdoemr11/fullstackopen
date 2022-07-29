import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logginUser } from '../reducers/loggedUserReducer'


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
  >
    <h2>Login to application</h2>
    <form action=""
      onSubmit={handleLogin}
    >
      <label htmlFor="Username">username</label>
      <input type="input"
        name="Username"
        id="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br/>
      <label htmlFor="Password">password</label>
      <input type="password"
        name="Password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" id="login-button"/>
    </form>
  </div>
}