import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:9051",
=======
  baseURL: "https://final-year-project-leq6.onrender.com";
>>>>>>> c01e189c83d54a085534888b5aa54ae41312aa43
});


axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axiosInstance;
