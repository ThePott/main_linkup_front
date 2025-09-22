import CustomImage from "../../package/customImage/CustomImage.jsx";

const CustomImageIcon = ({ url, ...props }) => {
  return <CustomImage {...props} url={url} height="MD" shape="CIRCLE"  />;
};

export default CustomImageIcon;