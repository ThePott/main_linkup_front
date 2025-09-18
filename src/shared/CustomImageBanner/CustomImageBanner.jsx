import CustomImage from "../../package/customImage/CustomImage.jsx";

const CustomImageBanner = ({ url, ...props }) => {
  return <CustomImage {...props} url={url} height="LX" shape="SHARP_RECTANGLE" />;
};

export default CustomImageBanner;
