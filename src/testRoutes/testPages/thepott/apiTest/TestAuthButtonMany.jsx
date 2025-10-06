import { getThenLog, postThenLog } from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";

const baseURL = import.meta.env.BASE_URL;

const TestAuthButtonMany = (accessToken, setAccessToken) => {
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

    return (
        <>
            <CustomButton onClick={postEmailVerification}>send email verification</CustomButton>
            <CustomButton onClick={postFanLogin}>
                <p>fan login</p>
            </CustomButton>
            <CustomButton onClick={postCompanyLogin}>
                <p>company login</p>
            </CustomButton>
            <CustomButton onClick={getMe}>
                <p>get me</p>
            </CustomButton>
        </>
    );
};

export default TestAuthButtonMany;
