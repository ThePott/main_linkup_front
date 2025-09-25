import CustomButton from "../../../package/customButton/CustomButton";

export const BulkDownloadButton = () => {
    const handleClick = () => {
        console.log("---- download clicked");
    };
    return <CustomButton onClick={handleClick}>다운로드</CustomButton>;
};

export const BulkUploadButton = () => {
    const handleClick = () => {
        console.log("---- upload clicked");
    };
    return <CustomButton onClick={handleClick}>업로드</CustomButton>;
};
