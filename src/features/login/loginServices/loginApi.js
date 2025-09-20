import axiosInstance from "../../../shared/services/axiosInstance";

/**
 * @param {object} body
 * @param {string} body.email
 * @param {string} body.password
 */
export const login = async (body) => {
    const response = await axiosInstance.post("/api/auth/login", body);
    const { token_type, access_token } = response.data;
    console.log({ token_type });
    return access_token;
};

export const socialLogin = async (provider) => {
    const response = await axiosInstance.get(`/api/auth/${provider}/login`);
    const access_token = response.data;
    console.log({ access_token });
    return access_token;
};
