import axios from "axios";
import useLinkUpStore from "../store/store";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = useLinkUpStore.getState().token;
    if (!token) {
        return config;
    }

    config.headers.Autorization = `Bearer ${token}`;
    return config;
});

export default axiosInstance;
