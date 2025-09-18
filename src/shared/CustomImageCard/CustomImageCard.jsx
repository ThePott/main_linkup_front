import CustomImage from "../../package/customImage/CustomImage.jsx";

const CustomImageCard = ({ url, ...props }) => {
  return <CustomImage {...props} url={url} height= "LG" shape= "ROUNDED_RECTANGLE"  />;
};

export default CustomImageCard;