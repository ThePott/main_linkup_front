import { getThenLog } from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";

const baseURL = import.meta.env.VITE_BASE_URL;

const TestSubscriptionsButtonMany = ({ accessToken }) => {
    const getSubscriptions = () =>
        getThenLog(`${baseURL}/api/subscriptions`, undefined, accessToken);

    const getSubscriptionsIncludingImage = () =>
        getThenLog(`${baseURL}/api/subscriptions/?include_image=true`, undefined, accessToken);

    return (
        <>
            <CustomButton onClick={getSubscriptions}>
                <p>get subscription</p>
            </CustomButton>

            <CustomButton onClick={getSubscriptionsIncludingImage}>
                <p>get subscription with name</p>
            </CustomButton>
        </>
    );
};

export default TestSubscriptionsButtonMany;
