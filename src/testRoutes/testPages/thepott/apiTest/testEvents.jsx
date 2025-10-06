import { getThenLog } from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";

const baseURL = import.meta.env.BASE_URL;

const TestEventsButtonMany = (accessToken) => {
    const getEvents = () => getThenLog(`${baseURL}/api/events/`, undefined, accessToken);

    const getEventsWithoutToken = () => getThenLog(`${baseURL}/api/events/?is_active=true`);

    const getEventsWithIsActive = () =>
        getThenLog(`${baseURL}/api/events/?is_active=true`, undefined, accessToken);

    return (
        <>
            <CustomButton onClick={getEvents}>
                <p>get events</p>
            </CustomButton>
            <CustomButton onClick={getEventsWithoutToken}>
                <p>get events without token</p>
            </CustomButton>
            <CustomButton onClick={getEventsWithIsActive}>
                <p>get events with is active</p>
            </CustomButton>
        </>
    );
};

export default TestEventsButtonMany;
