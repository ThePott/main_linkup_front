import axiosInstance from "../../../shared/services/axiosInstance";

/**
 * @param {object} body
 * @param {string} body.email
 * @param {string} body.password
 */
export const login = async (body) => {
    console.log({ body });
    const response = await axiosInstance.post("/api/auth/login", body);
    debugger;
    const { message, token } = response.data;
    debugger;
    console.log({ message });
    return token;
};
