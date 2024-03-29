import axios from "axios";

const axiosClient = axios.create({
   baseURL: "http://localhost:5000/api/",
   headers: {
      "Content-Type": "application/json",
   },
});

axiosClient.interceptors.request.use((config) => {
   const accessToken = localStorage.getItem("token");

   if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
   }

   return config;
});

export default axiosClient;
