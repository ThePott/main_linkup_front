import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://3.39.239.114:8000/",
});

export default axiosInstance;
