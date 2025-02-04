import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://final-year-project-leq6.onrender.com
});


axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axiosInstance;
