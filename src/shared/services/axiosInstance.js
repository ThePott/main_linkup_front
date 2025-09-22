import axios from "axios";
import useLinkUpStore from "../store/store";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const state = useLinkUpStore.getState();
    const access_token = state.access_token;

    if (!access_token) {
        return config;
    }

    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
});

export default axiosInstance;
