import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPE } from "./actionType";
import { addUserData, getUser } from "../../service/userService";

let error = {
  statusCode: 404,
  message: "Network error, Please try again",
};

export const userLogin = createAsyncThunk(
  ACTION_TYPE.login_user,
  async ({ email, password }, thunkApi) => {
    try {
      const response = await getUser({email, password});
      return response.data;
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

export const addUser = createAsyncThunk(
  ACTION_TYPE.signup_user,
  async ({ name, email, password }, thunkApi) => {
    try {
      console.log(name,email,password)
      const response = await addUserData({name,email,password});
      return response.data;
    } catch (err) {
      console.log(err, "this is the erro");
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
