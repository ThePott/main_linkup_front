import { getThenLog } from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";

const baseURL = import.meta.env.VITE_BASE_URL;

const TestIdolButtonMany = ({ accessToken }) => {
    const getIdol = () => getThenLog(`${baseURL}/api/idol`, undefined, accessToken);
    const getIdolWithoutToken = () => getThenLog(`${baseURL}/api/idol`);
    const getIdolKarina = () => getThenLog(`${baseURL}/api/idol?artist_id=6`);

    return (
        <>
            <CustomButton onClick={getIdol}>
                <p>get idol</p>
            </CustomButton>
            <CustomButton onClick={getIdolWithoutToken}>
                <p>get idol without token</p>
            </CustomButton>
            <CustomButton onClick={getIdolKarina}>
                <p>get idol karina</p>
            </CustomButton>
        </>
    );
};

export default TestIdolButtonMany;
