import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_HOST_KEY
export const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json'
  }
})
