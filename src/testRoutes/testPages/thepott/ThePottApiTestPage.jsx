import CustomButton from "../../../package/customButton/CustomButton";
import { FullScreen, Vstack } from "../../../package/layout";
import RoundBox from "../../../package/RoundBox";
import {
    getThenLog,
    postThenLog,
} from "../../../package/commonServices/fetchVariants";
import { useState } from "react";

const RoundBoxGlobalShadow = ({ style, children, ...props }) => {
    return (
        <RoundBox
            style={{ boxShadow: "var(--drop-shadow-md)", ...style }}
            {...props}
        >
            {children}
        </RoundBox>
    );
};

const baseURL = import.meta.env.VITE_BASE_URL;
const getHome = () => getThenLog(`${baseURL}`);
const getHealth = () => getThenLog(`${baseURL}/health`);
const postEmailVerification = () =>
    postThenLog(`${baseURL}/api/auth/send-verification-email`, {
        email: "nusilite@gmail.com",
    });
const postLogin = (callback) =>
    postThenLog(
        `${baseURL}/api/auth/login`,
        {
            email: "fan_dummy_1@gmail.com",
            password: "fan123!",
        },
        callback,
    );

const ThePottApiTestPage = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const getMe = (callback) =>
        getThenLog(`${baseURL}/api/auth/me`, callback, accessToken);

    const callbackLogin = (data) => {
        setAccessToken(data.access_token);
    };

    const callbackMe = (data) => {
        setUser(data);
    };

    return (
        <FullScreen center>
            <RoundBoxGlobalShadow padding="XL">
                <Vstack gap="xl">
                    <RoundBoxGlobalShadow padding="XL">
                        개벌자 도구(Cmd + Alt + I) {"->"} Console 탭
                    </RoundBoxGlobalShadow>
                    <CustomButton onClick={getHome}>get home</CustomButton>
                    <CustomButton onClick={getHealth}>get health</CustomButton>
                    <CustomButton onClick={postEmailVerification}>
                        send email verification
                    </CustomButton>
                    <CustomButton onClick={() => postLogin(callbackLogin)}>
                        <p>login</p>
                        <p>{accessToken}</p>
                    </CustomButton>
                    <CustomButton onClick={() => getMe(callbackMe)}>
                        <p>get me</p>
                        <p>{JSON.stringify(user)}</p>
                    </CustomButton>
                </Vstack>
            </RoundBoxGlobalShadow>
        </FullScreen>
    );
};

export default ThePottApiTestPage;
