import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/BlogReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer
  }
})

export default store