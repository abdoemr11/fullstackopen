import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers : {
    setNotification(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification(state, action) {
      return null
    }
  }
})

export const addNotification = (notification, timeInSeconds=3) => {
  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeInSeconds*1000)

  }
}
export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer