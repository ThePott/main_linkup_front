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

/**
 * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method
 * @param {string} url
 * @param {any} body
 * @param {object} options
 * @param {string} options.access_token
 * @param {(...params: any[]) => void} options.callback
 */
export const axiosReturnsData = async (method, url, body, options) => {
    if (options?.access_token) {
        axiosInstance.headers = { Authorization: `Bearer ${options.access_token}` };
    }

    let response;
    switch (method) {
        case "GET": {
            response = await axiosInstance.get(url);
            break;
        }
        case "POST": {
            response = await axiosInstance.post(url, body);
            break;
        }
        case "PUT": {
            response = await axiosInstance.put(url, body);
            break;
        }
        case "PATCH": {
            response = await axiosInstance.patch(url, body);
            break;
        }
        case "DELETE": {
            response = await axiosInstance.delete(url);
            break;
        }
        default:
            throw new Error("---- ERROR OCCURRED: 잘못된 메소드입니다");
    }

    if (options?.callback) {
        options.callback();
    }

    return response.data;
};

export const axiosDownloadFile = async (url) => {
    try {
        const response = await axiosInstance.get(url, { responseType: "blob" });

        const downloadUrl = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error(error);
        debugger;
    }
};
