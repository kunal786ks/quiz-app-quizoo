import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPE } from "./actionType";
import {
  addUserData,
  getUser,
  deleteUserApi,
  updateUserApi,
  updateProfilePicApi,
  userPassRequestApi,
  updatePasswordApi,
} from "../../service/userService";

let error = {
  statusCode: 404,
  message: "Network error, Please try again",
};

export const userLogin = createAsyncThunk(
  ACTION_TYPE.login_user,
  async ({ email, password }, thunkApi) => {
    try {
      const response = await getUser({ email, password });
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
      console.log(name, email, password);
      const response = await addUserData({ name, email, password });
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

export const deleteUser = createAsyncThunk(
  ACTION_TYPE.delete_user,
  async ({ userId, token }, thunkApi) => {
    try {
      const response = await deleteUserApi({ userId, token });
      console.log(response);
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

export const updateUser = createAsyncThunk(
  ACTION_TYPE.update_user,
  async ({ userId, token, name, email }, thunkApi) => {
    try {
      const response = await updateUserApi({ userId, token, name, email });
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

export const updateProfile = createAsyncThunk(
  ACTION_TYPE.update_profile,
  async ({ token, userId, pic }, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("pic", pic);
      const response = await updateProfilePicApi({ userId, formData, token });
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

export const userPassRequest = createAsyncThunk(
  ACTION_TYPE.pass_request,
  async ({ email }, thunkApi) => {
    try {
      const response = await userPassRequestApi({ email });
      return response;
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

export const updatePassword = createAsyncThunk(
  ACTION_TYPE.pass_update,
  async ({ email, otp, newPassword }, thunkApi) => {
    try {
      const response=await updatePasswordApi({email,otp,newPassword})
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
