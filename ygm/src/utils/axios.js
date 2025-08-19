// import axios from 'axios'

// const axiosInstance  = axios.create({

//     // baseURL:'http://localhost:5000/api',
//     baseURL:import.meta.env.VITE_CORS_ORIGIN,
//     withCredentials:true,
// })



// export default axiosInstance


import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CORS_ORIGIN, // backend ka base URL
  withCredentials: true, // cookie bhejne ke liye
});

// ✅ Request Interceptor - har request ke sath token bhej do
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor - agar token expire ho jaye to logout ya refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid/expired
      localStorage.removeItem("accessToken");
      // optional: redirect to login
      // window.location.href = "/login";
    navigate('/')
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
