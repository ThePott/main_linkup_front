import CustomButton from "../../package/customButton/CustomButton";
import axiosInstance from "../services/axiosInstance";
import useLinkUpStore from "../store/store";

const downloadFile = async (artist_id) => {
    const queryParams = artist_id ? `?artist_id=${artist_id}` : "";
    try {
        const response = await axiosInstance.get(`/api/events/file/download-all${queryParams}`, {
            responseType: "blob",
        });

        const downloadUrl = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error(error);
        debugger;
    }
};

export const BulkDownloadButton = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const artist_id = selectedArtist?.id;

    const handleClick = () => {
        downloadFile(artist_id);
    };

    return <CustomButton onClick={handleClick}>다운로드</CustomButton>;
};
