import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/BlogReducer'
import notificationReducer from './reducers/notificationReducer'
import loggedUserReducer from './reducers/loggedUserReducer'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    loggedUser: loggedUserReducer
  }
})

export default store