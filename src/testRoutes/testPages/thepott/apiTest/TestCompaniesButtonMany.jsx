import {
    getFileThenDownload,
    getThenLog,
    postFileThenLog,
} from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";
import RoundBox from "../../../../package/RoundBox";

const baseURL = import.meta.env.VITE_BASE_URL;

const TestCompaniesButtonMany = ({ accessToken }) => {
    const getCompaniesArtists = () =>
        getThenLog(`${baseURL}/api/companies/artists`, undefined, accessToken);

    const getCompaniesEvents = () =>
        getThenLog(`${baseURL}/api/companies/events`, undefined, accessToken);

    const getCompaniesEventsAespa = () =>
        getThenLog(`${baseURL}/api/companies/events?artist_id=6`, undefined, accessToken);

    const getCompanyUploadTemplate = () =>
        getFileThenDownload(
            `${baseURL}/api/companies/artists/upload-template`,
            undefined,
            accessToken,
        );

    const handleBulkUpload = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        postFileThenLog(`${baseURL}/api/events/file/upload-all`, formData, accessToken);
    };
    return (
        <>
            <CustomButton onClick={getCompaniesArtists}>
                <p>get companies artists</p>
            </CustomButton>

            <CustomButton onClick={getCompaniesEvents}>
                <p>get companies events</p>
            </CustomButton>

            <CustomButton onClick={getCompaniesEventsAespa}>
                <p>get companies events</p>
            </CustomButton>

            <CustomButton onClick={getCompanyUploadTemplate}>
                <p>get upload template </p>
            </CustomButton>

            <RoundBox>
                <form onSubmit={handleBulkUpload}>
                    <input type="file" name="file" />
                    <CustomButton>upload</CustomButton>
                </form>
            </RoundBox>
        </>
    );
};

export default TestCompaniesButtonMany;
