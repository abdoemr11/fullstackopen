import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'
import blogService from '../services/blogs'
import { addNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})
export const logginUser = (username, password) => {
  return async dispatch => {
    try {
      const loggedUser = await login.login({ username, password })
      console.log(loggedUser)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      dispatch(addNotification({ type: 'Success', msg:'You Logged In successfully' }))

    } catch (e) {
      dispatch(addNotification({ type:'Error', msg:e.response.data.error }))

    }
  }
}
export default userSlice.reducer
export const { setUser } = userSlice.actions