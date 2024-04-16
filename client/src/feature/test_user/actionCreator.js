import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPE } from "./actionType";
import { createTestApi } from "../../service/testService";

let error = {
  statusCode: 404,
  message: "Network error, Please try again",
};

export const addTest = createAsyncThunk(
  ACTION_TYPE.create_test,
  async ({title,time_to_finish,testCategory,instruction,totalQuestions,passingMarks,MaximumMarks,token}, thunkApi) => {
    try {
        const response=await createTestApi({title,time_to_finish,testCategory,instruction,totalQuestions,passingMarks,MaximumMarks,token})
        return response.data
    } catch (err) {
      if (err.response) {
        return thunkApi.rejectWithValue({
          statusCode: err.response.status,
          message: err.response.data.message,
        });
      }
      return thunkApi.rejectWithValue({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }
);
