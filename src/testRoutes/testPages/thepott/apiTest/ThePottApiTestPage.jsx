import { useState } from "react";
import { getThenLog } from "../../../../package/commonServices/fetchVariants";
import { FullScreen, Vstack } from "../../../../package/layout";
import FlexOneContainer from "../../../../package/flexOneContainer/FlexOneContainer";
import CustomButton from "../../../../package/customButton/CustomButton";
import RoundBox from "../../../../package/RoundBox";
import TestAuthButtonMany from "./TestAuthButtonMany";
import TestEventsButtonMany from "./TestEventsButtonMany";
import TestSubscriptionsButtonMany from "./TestSubscriptionsButtonMany";
import TestIdolButtonMany from "./TestIdolButtonMany";
import TestCompaniesButtonMany from "./TestCompaniesButtonMany";
import TestPostsButtonMany from "./TestPostsButtonMany";

const baseURL = import.meta.env.VITE_BASE_URL;
const getHome = () => getThenLog(`${baseURL}`);
const getHealth = () => getThenLog(`${baseURL}/health`);

const ThePottApiTestPage = () => {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <FullScreen center>
            <FlexOneContainer isYScrollable>
                <RoundBox padding="XL">
                    <Vstack gap="xl">
                        <RoundBox padding="XL">
                            개발자 도구(Cmd + Alt + I) {"->"} Console 탭
                        </RoundBox>
                        <CustomButton onClick={getHome}>get home</CustomButton>
                        <CustomButton onClick={getHealth}>get health</CustomButton>
                        <TestAuthButtonMany
                            accessToken={accessToken}
                            setAccessToken={setAccessToken}
                        />
                        <TestEventsButtonMany accessToken={accessToken} />
                        <TestSubscriptionsButtonMany accessToken={accessToken} />
                        <TestIdolButtonMany accessToken={accessToken} />
                        <TestCompaniesButtonMany accessToken={accessToken} />
                        <TestPostsButtonMany accessToken={accessToken} />
                    </Vstack>
                </RoundBox>
            </FlexOneContainer>
        </FullScreen>
    );
};

export default ThePottApiTestPage;
