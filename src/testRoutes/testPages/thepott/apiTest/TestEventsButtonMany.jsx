import { getFileThenDownload, getThenLog } from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";

const baseURL = import.meta.env.VITE_BASE_URL;

const TestEventsButtonMany = ({ accessToken }) => {
    const getEvents = () => getThenLog(`${baseURL}/api/events`, undefined, accessToken);

    const getEventsWithoutToken = () => getThenLog(`${baseURL}/api/events`);

    const getEventsSubscribed = () =>
        getThenLog(`${baseURL}/api/events/subscribed`, undefined, accessToken);

    const getEventsOfKarina = () => getThenLog(`${baseURL}/api/events?artist_id=6`);

    const getBulkEvent = () =>
        getFileThenDownload(`${baseURL}/api/events/file/download-all`, undefined, accessToken);

    return (
        <>
            <CustomButton onClick={getEvents}>get events</CustomButton>

            <CustomButton onClick={getEventsWithoutToken}>get events without token</CustomButton>

            <CustomButton onClick={getEventsSubscribed}>get events subscribed</CustomButton>

            <CustomButton onClick={getEventsOfKarina}>get events of karina</CustomButton>

            <CustomButton onClick={getBulkEvent}>get events download all</CustomButton>
        </>
    );
};

export default TestEventsButtonMany;
