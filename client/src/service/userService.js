import { axiosApi } from "../config/axios";
import axios from "axios";

export const getUser = ({ email, password }) =>
  axiosApi.post(`/api/user/login`, { email, password });

export const addUserData = ({ name, email, password }) =>
  axiosApi.post(`/api/user/signup`, { name, email, password });

export const deleteUserApi = ({ userId, token }) =>
  axiosApi.delete(`/api/user/delete-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUserApi = ({ userId, token, name, email }) =>
  axiosApi.put(
    `/api/user/update-user/${userId}`,
    {
      name,
      email,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const updateProfilePicApi = async ({ userId, formData, token }) =>
  axios.post(
    `${process.env.REACT_APP_API_HOST_KEY}/api/user/uploadpic/${userId}`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const userPassRequestApi = async ({ email }) =>
  axiosApi.post(`/api/user/passchange`, { email });

export const updatePasswordApi = async ({ email, otp, newPassword }) =>
  axiosApi.post(`api/user/update-password`, { email, otp, newPassword });
