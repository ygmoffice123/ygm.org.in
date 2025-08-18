import axios from 'axios'

const axiosInstance  = axios.create({

    // baseURL:'http://localhost:5000/api',
    baseURL:import.meta.env.VITE_CORS_ORIGIN,
    withCredentials:true,
})



export default axiosInstance