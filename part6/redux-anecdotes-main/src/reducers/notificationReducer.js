import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState:null,
  reducers: {
    setNotification(state, action) {
      // console.log(action)
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export default notificationSlice.reducer;
const {setNotification, removeNotification}  = notificationSlice.actions;

let notificationTimer;
export const setNotificationForTime = (notification, time) => {
  return async dispatch => {
    clearTimeout(notificationTimer)
     dispatch(setNotification(notification))
    console.log('hi', notification)
    notificationTimer = setTimeout(()=>{
      console.log('bye')

      dispatch(removeNotification())
    }, time*1000)

  }
}