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
export const {setNotification, removeNotification}  = notificationSlice.actions;