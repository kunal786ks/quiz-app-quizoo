import { createSlice } from "@reduxjs/toolkit";
import { addTest } from "./actionCreator";

const initialState = {
  users_Test: [],
  loading: false,
};


const testSlice=createSlice({
    name:'test',
    initialState,
    reducers:{
        clearTest:(state,{payload})=>{

        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addTest.pending,(state)=>{
                state.loading=true
            })
            .addCase(addTest.fulfilled,(state,{payload})=>{
                console.log(payload);
                state.loading=false;
            })
            .addCase(addTest.rejected,(state,{payload})=>{
                state.loading=false;
            })
    }
})

export const { clearTest } = testSlice.actions;

export default testSlice.reducer;