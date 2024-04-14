import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  updatePassword,
  updateProfile,
  updateUser,
  userLogin,
  userPassRequest,
} from "./actionCreator";

const initialState = {
  user: false,
  userData: {},
  loading: false,
  selectedMenu: 100,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = false;
      state.userData = {};
      state.selectedMenu = 0;
      state.token = "";
    },
    selectMenu: (state, { payload }) => {
      state.selectedMenu = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        console.log(payload, "tis is of login");
        state.userData = payload?.user?.user;
        state.user = true;
        state.loading = false;
        state.token = payload?.user?.token;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        console.log(payload, "this is of signup");
        state.userData = payload?.user?.user;
        state.user = true;
        state.loading = false;
        state.token = payload?.user?.token;
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.user = false;
        state.userData = {};
        state.loading = false;
        state.selectedMenu = 0;
      })
      .addCase(deleteUser.rejected, (state, { paylaod }) => {
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.userData = payload.user;
        state.user = true;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.userData = payload.user;
        state.user = true;
        state.loading=false
      })
      .addCase(updateProfile.rejected,(state,{payload})=>{
        state.loading=false;
      })
      .addCase(userPassRequest.pending,(state)=>{
        state.loading=true;
      })
      .addCase(userPassRequest.fulfilled,(state,{payload})=>{
        state.loading=false;
      })
      .addCase(userPassRequest.rejected,(state,{payload})=>{
        state.loading=false;
      })
      .addCase(updatePassword.pending,(state)=>{
        state.loading=true;
      })
      .addCase(updatePassword.fulfilled,(state,{payload})=>{
        state.loading=false;
      })
      .addCase(updatePassword.rejected,(state,{payload})=>{
        state.loading=false;
      })
  },
});

export const { logoutUser, selectMenu } = userSlice.actions;

export default userSlice.reducer;
