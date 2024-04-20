import { createSlice } from "@reduxjs/toolkit";
import { addTest } from "./actionCreator";

const initialState = {
  test_id:"",
  loading: false,
};


const testSlice=createSlice({
    name:'test',
    initialState,
    reducers:{
        clearTest:(state,{payload})=>{

        },
        viewTest:(state,{payload})=>{
            console.log(payload);
            state.test_id=payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addTest.pending,(state)=>{
                state.loading=true;
            })
            .addCase(addTest.fulfilled,(state,{payload})=>{
                console.log(payload);
                state.test_id=payload?.test?._id
                state.loading=false;
            })
            .addCase(addTest.rejected,(state,{payload})=>{
                state.loading=false;
            })
    }
})

export const { clearTest,viewTest } = testSlice.actions;

export default testSlice.reducer;