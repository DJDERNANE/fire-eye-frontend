import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    available:false
};

const AlertSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    openAlert: (state, action) => {
      state.availble = true;
      setTimeout(()=> state.available=false, 3000)
    },

  },
});

export const  {openAlert} = AlertSlice.actions
export default AlertSlice.reducer