import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/BlogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer
  }
})

export default store