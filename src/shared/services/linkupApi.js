// TODO: 작성 규칙
// 1. 함수 이름은 api + endpoint 이름
// 2. 함수를 작성할 땐 모든 메소드의 경우를 포함합니다
// 3. 함수를 작성한 이후엔 jsdoc을 작성합니다

import axiosInstance from "./axiosInstance";

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
            try {
                response = await axiosInstance.get(ADDITIONAL_URL);
                console.log({ response });
            } catch (error) {
                console.error(error);
                debugger;
            }
            break;
        case "PUT":
            if (!body) {
                throw new Error(
                    "---- ERROR OCCURRED: MISSING BODY WHEN REQUEST",
                );
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
