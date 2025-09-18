import CustomImage from "../../package/customImage/CustomImage.jsx";

const CustomImageIcon = ({ url, height = "MD", shape = "CIRCLE", ...props }) => {
  return <CustomImage url={url} height={height} shape={shape} {...props} />;
};

export default CustomImageIcon;