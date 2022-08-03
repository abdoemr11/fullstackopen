import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action){
      return action.payload
    }
  }
})
export const getAllUsers = () => {
  return async dispatch => {
    const users = await  userService.getAll()
    dispatch(setUsers(users))
  }
}
export default usersSlice.reducer
export const { setUsers } = usersSlice.actions