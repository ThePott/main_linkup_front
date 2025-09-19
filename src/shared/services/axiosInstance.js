import axios from "axios";
import useLinkUpStore from "../store/store";

const axiosInstance = axios.create({
    baseURL: "http://3.35.210.2:8000",
});

axiosInstance.interceptors.request.use((config) => {
    const token = useLinkUpStore.getState().token;
    if (!token) {
        return;
    }

    config.headers.Autorization = token;
    return config;
});

export default axiosInstance;
