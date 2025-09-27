// TODO: 작성 규칙
// 1. 함수 이름은 api + endpoint 이름
// 2. 함수를 작성할 땐 모든 메소드의 경우를 포함합니다
// 3. 함수를 작성한 이후엔 jsdoc을 작성합니다

import useLinkUpStore from "../store/store";
import axiosInstance, { axiosReturnsData } from "./axiosInstance";

/**
 * @param {"GET" | "PUT" | "DELETE"} method
 * @param {object} body
 * @param {string} body.nickname
 * @param {string} body.phone_number
 */
export const apiAuthMe = async (method, body) => {
    const ADDITIONAL_URL = "/api/auth/me";
    let response;
    switch (method) {
        case "GET":
            response = await axiosInstance.get(ADDITIONAL_URL);
            break;
        case "PUT":
            if (!body) {
                throw new Error("---- ERROR OCCURRED: MISSING BODY WHEN REQUEST");
            }
            response = await axiosInstance.put(ADDITIONAL_URL, body);
            break;
        case "DELETE":
            response = await axiosInstance.delete(ADDITIONAL_URL);
            break;
        default:
            throw new Error("---- ERROR OCCURRED: WRONG METHOD");
    }

    const data = response.data;
    return data;
};

/**
 * @param {object} body
 * @param {string} body.email
 * @param {string} body.password
 */
export const apiAuthLogin = async (body) => {
    const data = await axiosReturnsData("POST", "/api/auth/login", body);
    const access_token = data.access_token;
    useLinkUpStore.setState({ access_token });

    const user = await axiosReturnsData("GET", "/api/auth/me", access_token);
    const setUser = useLinkUpStore.getState().setUser;
    setUser(user);

    return user;
};

/** // 비밀번호 변경 용 함수
 * @param {string} currentPassword 기존 비밀번호
 * @param {string} newPassword 새 비밀번호
 * @param {string} newPasswordConfirm 새 비밀번호 확인
 */
export const apiChangePassword = async (currentPassword, newPassword, newPasswordConfirm) => {
    const ADDITIONAL_URL = "/api/auth/me/password";
    const response = await axiosInstance.put(ADDITIONAL_URL, {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
    });
    return response.data;
};
