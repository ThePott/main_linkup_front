import { getThenLog } from "../../../../package/commonServices/fetchVariants";

const testEvents = (baseURL, accessToken) => {
    const getEvents = () => getThenLog(`${baseURL}/api/events/`, undefined, accessToken);

    const getEventsWithoutToken = () => getThenLog(`${baseURL}/api/events/?is_active=true`);

    const getEventsWithIsActive = () =>
        getThenLog(`${baseURL}/api/events/?is_active=true`, undefined, accessToken);

    return { getEvents, getEventsWithoutToken, getEventsWithIsActive };
};

export default testEvents;
