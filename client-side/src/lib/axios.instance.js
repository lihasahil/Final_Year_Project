import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "findmebackend1.vercel.app",
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axiosInstance;
