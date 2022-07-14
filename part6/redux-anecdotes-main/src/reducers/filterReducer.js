import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name:"filter",
  initialState: "",
  reducers: {
    updateFilter(state, action){
      return action.payload
    }
  }
})

export default filterSlice.reducer
export const {updateFilter} = filterSlice.actions