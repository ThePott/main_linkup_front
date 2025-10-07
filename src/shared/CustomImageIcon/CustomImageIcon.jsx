import CustomImage from "../../package/customImage/CustomImage.jsx";

const CustomImageIcon = ({ url, ...props }) => {
    return (
        <CustomImage
            {...props}
            url={url || import.meta.env.VITE_PLACEHOLDER_IMAGE}
            height="xs"
            shape="CIRCLE"
        />
    );
};

export default CustomImageIcon;
