import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../../package/customButton/CustomButton";
import { FullScreen, Vstack } from "../../../package/layout";
import RoundBox from "../../../package/RoundBox";
import axiosInstance from "../../../shared/services/axiosInstance";
import {
    getThenLog,
    postThenLog,
} from "../../../package/commonServices/fetchVariants";

const getHome = () => axiosInstance.get("/");
const getHealth = () => axiosInstance.get("/health");

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

const ThePottApiTestPage = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const getHome = () => getThenLog(`${baseURL}`);
    const getHealth = () => getThenLog(`${baseURL}/health`);
    const postEmailVerification = () =>
        postThenLog(`${baseURL}/api/auth/send-verification-email`, {
            email: "nusilite@gmail.com",
        });
    const postLogin = () =>
        postThenLog(`${baseURL}/api/auth/login`, {
            email: "fan_dummy_1@gmail.com",
            password: "fan123!",
        });

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
                    <CustomButton onClick={postLogin}>login</CustomButton>
                </Vstack>
            </RoundBoxGlobalShadow>
        </FullScreen>
    );
};

export default ThePottApiTestPage;
