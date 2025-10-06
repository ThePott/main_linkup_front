import { getFileThenDownload, getThenLog } from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";

const baseURL = import.meta.env.VITE_BASE_URL;

const TestEventsButtonMany = ({ accessToken }) => {
    const getEvents = () => getThenLog(`${baseURL}/api/events`, undefined, accessToken);

    const getEventsWithoutToken = () => getThenLog(`${baseURL}/api/events`);

    const getEventsSubscribed = () =>
        getThenLog(`${baseURL}/api/events/subscribed`, undefined, accessToken);

    const getBulkEvent = () =>
        getFileThenDownload(`${baseURL}/api/events/file/download-all`, undefined, accessToken);

    return (
        <>
            <CustomButton onClick={getEvents}>
                <p>get events</p>
            </CustomButton>

            <CustomButton onClick={getEventsWithoutToken}>
                <p>get events without token</p>
            </CustomButton>

            <CustomButton onClick={getEventsSubscribed}>
                <p>get events subscribed</p>
            </CustomButton>

            <CustomButton onClick={getBulkEvent}>
                <p>get events download all</p>
            </CustomButton>
        </>
    );
};

export default TestEventsButtonMany;
