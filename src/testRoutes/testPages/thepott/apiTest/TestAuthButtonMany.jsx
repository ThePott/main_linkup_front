import {
    fetchThenLog,
    getThenLog,
    postThenLog,
} from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";
import CustomInput from "../../../../package/CustomInput";
import GridContainer from "../../../../package/gridContainer/GridContainer";
import RoundBox from "../../../../package/RoundBox";

const baseURL = import.meta.env.VITE_BASE_URL;

const TestAuthButtonMany = ({ accessToken, setAccessToken }) => {
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

    const handleSubmitPutMe = (event) => {
        event.preventDefault();

        const body = new FormData(event.target);
        const nickname = body.get("nickname");

        fetchThenLog({
            url: `${baseURL}/api/auth/me?nickname=${nickname}`,
            accessToken,
            body,
            method: "PUT",
        });
    };

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

            <RoundBox>
                <p>update my profile</p>
                <form onSubmit={handleSubmitPutMe}>
                    <CustomInput type="file" name="profile_image" />
                    <CustomInput type="text" name="nickname" placeholder="nickname" />
                    <CustomButton>update my profile</CustomButton>
                </form>
            </RoundBox>
        </>
    );
};

export default TestAuthButtonMany;
