import { getThenLog, postThenLog } from "../../../../package/commonServices/fetchVariants";

const testAuth = (baseURL, accessToken, setAccessToken) => {
    const postEmailVerification = () =>
        postThenLog(`${baseURL}/api/auth/send-verification-email`, {
            email: "nusilite@gmail.com",
        });

    const postFanLogin = () =>
        postThenLog(
            `${baseURL}/api/auth/login`,
            {
                email: "fan_dummy_1@gmail.com",
                password: "fan123!",
            },
            (data) => setAccessToken(data.access_token),
        );

    const postCompanyLogin = () =>
        postThenLog(
            `${baseURL}/api/auth/login`,
            {
                email: "sm_dummy@company.com",
                password: "company123!",
            },
            (data) => setAccessToken(data.access_token),
        );

    const getMe = () => getThenLog(`${baseURL}/api/auth/me`, undefined, accessToken);

    return { postEmailVerification, postFanLogin, postCompanyLogin, getMe };
};

export default testAuth;
