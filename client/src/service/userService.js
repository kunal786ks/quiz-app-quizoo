import { axiosApi } from "../config/axios";
console.log(axiosApi,"this s")
export const getUser = ({email, password}) =>
  axiosApi.post(`/api/user/login`, { email, password });

export const addUserData = ({name, email, password}) =>
  axiosApi.post(`/api/user/signup`, { name, email, password });
