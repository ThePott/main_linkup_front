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
const postFanLogin = (callback) =>
    postThenLog(
        `${baseURL}/api/auth/login`,
        {
            email: "fan_dummy_1@gmail.com",
            password: "fan123!",
        },
        callback,
    );
const postCompanyLogin = (callback) =>
    postThenLog(
        `${baseURL}/api/auth/login`,
        {
            email: "sm_dummy@company.com",
            password: "company123!",
        },
        callback,
    );
const getIdol = (callback) => getThenLog(`${baseURL}/api/idol`, callback);

const ThePottApiTestPage = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const getMe = (callback) =>
        getThenLog(`${baseURL}/api/auth/me`, callback, accessToken);
    const getFanSubscription = (callback) =>
        getThenLog(`${baseURL}/api/subscriptions`, callback, accessToken);
    const getEvents = (callback) =>
        getThenLog(
            // `${baseURL}/events/?artist_parent_group=1`,
            `${baseURL}/events/`,
            callback,
            accessToken,
        );

    const callbackLogin = (data) => {
        setAccessToken(data.access_token);
    };

    const callbackMe = (data) => {
        setUser(data);
    };
    const callbackEvents = (data) => {
        console.log({ data });
        debugger;
    };
    const callbackSubscriptions = (data) => {
        console.log({ data });
        debugger;
    };
    const callbackIdol = (data) => {
        console.log({ data });
        debugger;
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
                    <CustomButton onClick={() => postFanLogin(callbackLogin)}>
                        <p>fan login</p>
                        <p>{accessToken}</p>
                    </CustomButton>
                    <CustomButton
                        onClick={() => postCompanyLogin(callbackLogin)}
                    >
                        <p>company login</p>
                        <p>{accessToken}</p>
                    </CustomButton>
                    <CustomButton onClick={() => getMe(callbackMe)}>
                        <p>get me</p>
                        <p>{JSON.stringify(user)}</p>
                    </CustomButton>
                    <CustomButton onClick={() => getEvents(callbackEvents)}>
                        <p>get events</p>
                    </CustomButton>
                    <CustomButton
                        onClick={() =>
                            getFanSubscription(callbackSubscriptions)
                        }
                    >
                        <p>get subscription</p>
                    </CustomButton>
                    <CustomButton onClick={() => getIdol(callbackIdol)}>
                        <p>get idol</p>
                    </CustomButton>
                </Vstack>
            </RoundBoxGlobalShadow>
        </FullScreen>
    );
};

export default ThePottApiTestPage;
