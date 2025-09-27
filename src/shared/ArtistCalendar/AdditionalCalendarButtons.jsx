import CustomButton from "../../package/customButton/CustomButton";
import { axiosDownloadFile } from "../services/axiosInstance";
import useLinkUpStore from "../store/store";

const downloadFile = async (artist_id) => {
    const queryParams = artist_id ? `?artist_id=${artist_id}` : "";
    const url = `/api/events/file/download-all${queryParams}`;
    axiosDownloadFile(url);
};

export const BulkDownloadButton = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const artist_id = selectedArtist?.id;

    const handleClick = () => {
        downloadFile(artist_id);
    };

    return <CustomButton onClick={handleClick}>다운로드</CustomButton>;
};
