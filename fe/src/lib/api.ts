import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

if (!import.meta.env.VITE_API_URL) {
  throw new Error('API URL is missing in your env variables.')
}

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return error.response;
});

export default api