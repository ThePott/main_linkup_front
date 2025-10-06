import { useState } from "react";
import {
    getFileThenDownload,
    getThenLog,
    postFileThenLog,
    postThenLog,
} from "../../../../package/commonServices/fetchVariants";
import { axiosReturnsData } from "../../../../shared/services/axiosInstance";
import { FullScreen, Vstack } from "../../../../package/layout";
import FlexOneContainer from "../../../../package/flexOneContainer/FlexOneContainer";
import CustomButton from "../../../../package/customButton/CustomButton";
import RoundBox from "../../../../package/RoundBox";
import testAuth from "./testAuth";

const RoundBoxGlobalShadow = ({ style, children, ...props }) => {
    return (
        <RoundBox style={{ boxShadow: "var(--drop-shadow-md)", ...style }} {...props}>
            {children}
        </RoundBox>
    );
};

const baseURL = import.meta.env.VITE_BASE_URL;
const getHome = () => getThenLog(`${baseURL}`);
const getHealth = () => getThenLog(`${baseURL}/health`);

const postFanPost = () =>
    axiosReturnsData("POST", "/api/posts", {
        artist_id: 22,
        post_content: "가나다라",
    });

const ThePottApiTestPage = () => {
    const [accessToken, setAccessToken] = useState(null);

    const testAuthReturns = testAuth(baseURL, accessToken, setAccessToken);

    const getFanSubscriptionWithName = (callback) =>
        getThenLog(`${baseURL}/api/subscriptions/?include_image=true`, callback, accessToken);
    const getFanSubscription = (callback) =>
        getThenLog(`${baseURL}/api/subscriptions`, callback, accessToken);
    const getEvents = (callback) =>
        getThenLog(
            // `${baseURL}/events/?artist_parent_group=1`,
            `${baseURL}/api/events/`,
            callback,
            accessToken,
        );
    const getEventsWithoutToken = (callback) =>
        getThenLog(`${baseURL}/api/events/?is_active=true`, callback);
    const getEventsWithIsActive = (callback) =>
        getThenLog(`${baseURL}/api/events/?is_active=true`, callback, accessToken);
    const getIdol = (callback) => getThenLog(`${baseURL}/api/idol`, callback, accessToken);
    const getIdolWithoutToken = (callback) => getThenLog(`${baseURL}/api/idol`, callback);
    const getIdolKarina = (callback) => getThenLog(`${baseURL}/api/idol?artist_id=6`, callback);

    const getPosts = (callback) => getThenLog(`${baseURL}/api/posts`, callback);
    const getPostsOfFirst = (callback) => getThenLog(`${baseURL}/api/posts/artist_id=1`, callback);

    const getCompaniesArtists = (callback) =>
        getThenLog(`${baseURL}/api/companies/artists`, callback, accessToken);
    const getCompaniesEvents = (callback) =>
        getThenLog(`${baseURL}/api/companies/events`, callback, accessToken);
    const getCompaniesEventsAespa = (callback) =>
        getThenLog(`${baseURL}/api/companies/events?artist_id=6`, callback, accessToken);
    const getBulkEvent = (callback) =>
        getFileThenDownload(`${baseURL}/api/events/file/download-all`, callback, accessToken);
    const getCompanyUploadTemplate = (callback) =>
        getFileThenDownload(
            `${baseURL}/api/companies/artists/upload-template`,
            callback,
            accessToken,
        );

    const handleBulkUpload = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        postFileThenLog(`${baseURL}/api/events/file/upload-all`, formData, accessToken);
    };

    return (
        <FullScreen center>
            <FlexOneContainer isYScrollable>
                <RoundBoxGlobalShadow padding="XL">
                    <Vstack gap="xl">
                        <RoundBoxGlobalShadow padding="XL">
                            개발자 도구(Cmd + Alt + I) {"->"} Console 탭
                        </RoundBoxGlobalShadow>
                        <CustomButton onClick={getHome}>get home</CustomButton>
                        <CustomButton onClick={getHealth}>get health</CustomButton>
                        <CustomButton onClick={testAuthReturns.postEmailVerification}>
                            send email verification
                        </CustomButton>
                        <CustomButton onClick={testAuthReturns.postFanLogin}>
                            <p>fan login</p>
                        </CustomButton>
                        <CustomButton onClick={testAuthReturns.postCompanyLogin}>
                            <p>company login</p>
                        </CustomButton>
                        <CustomButton onClick={testAuthReturns.getMe}>
                            <p>get me</p>
                        </CustomButton>
                        <CustomButton onClick={() => getEvents(callbackLog)}>
                            <p>get events</p>
                        </CustomButton>
                        <CustomButton onClick={() => getEventsWithoutToken(callbackLog)}>
                            <p>get events without token</p>
                        </CustomButton>
                        <CustomButton onClick={() => getEventsWithIsActive(callbackLog)}>
                            <p>get events with is active</p>
                        </CustomButton>
                        <CustomButton onClick={() => getFanSubscriptionWithName(callbackLog)}>
                            <p>get subscription with name</p>
                        </CustomButton>
                        <CustomButton onClick={() => getFanSubscription(callbackLog)}>
                            <p>get subscription</p>
                        </CustomButton>
                        <CustomButton onClick={() => getIdol(callbackLog)}>
                            <p>get idol</p>
                        </CustomButton>
                        <CustomButton onClick={() => getIdolWithoutToken(callbackLog)}>
                            <p>get idol without token</p>
                        </CustomButton>
                        <CustomButton onClick={() => getIdolKarina(callbackLog)}>
                            <p>get idol karina</p>
                        </CustomButton>
                        <CustomButton onClick={() => getCompaniesArtists(callbackLog)}>
                            <p>get companies artists</p>
                        </CustomButton>
                        <CustomButton onClick={() => getCompaniesEvents(callbackLog)}>
                            <p>get companies events</p>
                        </CustomButton>
                        <CustomButton onClick={() => getCompaniesEventsAespa(callbackLog)}>
                            <p>get companies events</p>
                        </CustomButton>
                        <CustomButton onClick={() => postFanPost(callbackLog)}>
                            <p>post fan posting</p>
                        </CustomButton>
                        <CustomButton onClick={() => getPosts(callbackLog)}>
                            <p>get all posts</p>
                        </CustomButton>
                        <CustomButton onClick={() => getPostsOfFirst(callbackLog)}>
                            <p>get posts of first idol</p>
                        </CustomButton>
                        <CustomButton onClick={() => getBulkEvent(callbackLog)}>
                            <p>get bulk event</p>
                        </CustomButton>
                        <RoundBox>
                            <form onSubmit={handleBulkUpload}>
                                <input type="file" name="file" />
                                <CustomButton>upload</CustomButton>
                            </form>
                        </RoundBox>
                        <CustomButton onClick={() => getCompanyUploadTemplate(callbackLog)}>
                            <p>get upload template </p>
                        </CustomButton>
                    </Vstack>
                </RoundBoxGlobalShadow>
            </FlexOneContainer>
        </FullScreen>
    );
};

export default ThePottApiTestPage;
