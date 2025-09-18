import CustomImage from "../../package/customImage/CustomImage.jsx";

const CustomImageCard = ({ url, height = "LG",shape = "ROUNDED_RECTANGLE", ...props }) => {
  return <CustomImage url={url} height={height} shape={shape} {...props} />;
};

export default CustomImageCard;