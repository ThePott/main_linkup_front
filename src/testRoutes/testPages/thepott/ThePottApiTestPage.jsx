import CustomButton from "../../../package/customButton/CustomButton";
import { FullScreen, Vstack } from "../../../package/layout";
import RoundBox from "../../../package/RoundBox";
import {
    getThenLog,
    postThenLog,
} from "../../../package/commonServices/fetchVariants";
import { useState } from "react";
import FlexOneContainer from "../../../package/flexOneContainer/FlexOneContainer";

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
    const getCompaniesArtists = (callback) =>
        getThenLog(`${baseURL}/api/companies/artists`, callback, accessToken);
    const getCompaniesEvents = (callback) =>
        getThenLog(`${baseURL}/api/companies/events`, callback, accessToken);
    const getCompaniesEventsAespa = (callback) =>
        getThenLog(
            `${baseURL}/api/companies/events?artist_id=6`,
            callback,
            accessToken,
        );

    const callbackLogin = (data) => {
        setAccessToken(data.access_token);
    };

    const callbackMe = (data) => {
        setUser(data);
    };
    const callbackLog = (data) => {
        console.log({ data });
    };

    return (
        <FullScreen center>
            <FlexOneContainer isYScrollable>
                <RoundBoxGlobalShadow padding="XL">
                    <Vstack gap="xl">
                        <RoundBoxGlobalShadow padding="XL">
                            개벌자 도구(Cmd + Alt + I) {"->"} Console 탭
                        </RoundBoxGlobalShadow>
                        <CustomButton onClick={getHome}>get home</CustomButton>
                        <CustomButton onClick={getHealth}>
                            get health
                        </CustomButton>
                        <CustomButton onClick={postEmailVerification}>
                            send email verification
                        </CustomButton>
                        <CustomButton
                            onClick={() => postFanLogin(callbackLogin)}
                        >
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
                        <CustomButton onClick={() => getEvents(callbackLog)}>
                            <p>get events</p>
                        </CustomButton>
                        <CustomButton
                            onClick={() => getFanSubscription(callbackLog)}
                        >
                            <p>get subscription</p>
                        </CustomButton>
                        <CustomButton onClick={() => getIdol(callbackLog)}>
                            <p>get idol</p>
                        </CustomButton>
                        <CustomButton
                            onClick={() => getCompaniesArtists(callbackLog)}
                        >
                            <p>get companies artists</p>
                        </CustomButton>
                        <CustomButton
                            onClick={() => getCompaniesEvents(callbackLog)}
                        >
                            <p>get companies events</p>
                        </CustomButton>
                        <CustomButton
                            onClick={() => getCompaniesEventsAespa(callbackLog)}
                        >
                            <p>get companies events</p>
                        </CustomButton>
                    </Vstack>
                </RoundBoxGlobalShadow>
            </FlexOneContainer>
        </FullScreen>
    );
};

export default ThePottApiTestPage;
