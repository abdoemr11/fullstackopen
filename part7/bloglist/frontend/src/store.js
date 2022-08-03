import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/BlogReducer'
import notificationReducer from './reducers/notificationReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer
  }
})

export default store