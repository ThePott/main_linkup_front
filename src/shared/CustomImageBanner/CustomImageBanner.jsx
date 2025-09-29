import CustomImage from "../../package/customImage/CustomImage.jsx";

const CustomImageBanner = ({ url, ...props }) => {
    return <CustomImage {...props} url={url} height="LG" shape="SHARP_RECTANGLE" />;
};

export default CustomImageBanner;
