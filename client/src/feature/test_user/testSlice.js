import { createSlice } from "@reduxjs/toolkit";
import { addTest } from "./actionCreator";

const initialState = {
  test_id: "",
  loading: false,
  time_to_finsh: 0,
  questionAndAnsByuser: [],
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTimer: (state, { payload }) => {
      console.log(payload);
      state.time_to_finsh = payload;
    },
    answeringQuestion: (state, { payload }) => {
      console.log(payload, "thisis payload ");
      const { quesId, ansMarked } = payload;
      const index = state.questionAndAnsByuser?.findIndex(
        (item) => item.quesId === quesId
      );
      if (index !== -1) {
        state.questionAndAnsByuser[index].ansMarked = ansMarked;
      } else {
        state.questionAndAnsByuser.push(payload);
      }
    },
    viewTest: (state, { payload }) => {
      console.log(payload,"tjosos view test");
      state.test_id = payload;
    },
    userLoggedOut: (state) => {
      state.test_id = "";
      state.loading = false;
      state.time_to_finsh = 0;
      state.questionAndAnsByuser = [];
    },
    clearPreviousTestData:(state)=>{
      state.questionAndAnsByuser=[];
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTest.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.test_id = payload?.test?._id;
        state.loading = false;
      })
      .addCase(addTest.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export const { setTimer, viewTest, answeringQuestion, userLoggedOut,clearPreviousTestData } =
  testSlice.actions;

export default testSlice.reducer;
