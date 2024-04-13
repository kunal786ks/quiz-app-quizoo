import { createSlice } from "@reduxjs/toolkit";
import { addUser, userLogin } from "./actionCreator";


const initialState = {
  user: false,
  userData: {},
  loading:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = false;
      state.userData = {};
    } 
  },
  extraReducers:(builder)=>{
    builder
      .addCase(userLogin.pending,(state)=>{
        state.loading=true
      })
      .addCase(userLogin.fulfilled,(state,{payload})=>{
        console.log(payload,"tis is of login")
        state.userData=payload.user;
        state.user=true;
        state.loading=false;
      })
      .addCase(userLogin.rejected,(state,{payload})=>{
        state.loading=false;
      })
      .addCase(addUser.pending,(state)=>{
        state.loading=true;
      })
      .addCase(addUser.fulfilled,(state,{payload})=>{
        console.log(payload,"this is of signup")
        state.loading=false;
        state.userData=payload?.user;
        state.user=true;
      })
      .addCase(addUser.rejected,(state)=>{
        state.loading=false;
      })
  }
});

export const {  logoutUser } = userSlice.actions;

export default userSlice.reducer;