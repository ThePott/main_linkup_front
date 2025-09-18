import axiosInstance from "../../../shared/services/axiosInstance";

/**
 * @param {object} body
 * @param {string} body.email
 * @param {string} body.password
 */
export const login = async (body) => {
    debugger;
    const response = await axiosInstance.post(
        "/api/auth/send-verification-email",
        body,
    );

    const { message, token } = response.data;
    console.log({ message });
    return token;
};
