import styles from "./CustomImage.module.css";
/**
 * Custom image component with shape and height options
 * @param {object} props - The component props
 * @param {string} props.url - The image URL
 * @param {'CIRCLE' | 'ROUNDED_RECTANGLE' | 'SHARP_RECTANGLE'} props.shape - The shape of the image
 * @param {'SM' | 'MD' | 'LG'} props.height - The height size of the image
 * @returns {JSX.Element}
 */
const CustomImage = ({ url, shape, height, style, className, ...props }) => {
    const customImageStyle = {};
    switch (shape) {
        case "CIRCLE":
            customImageStyle["--rounded"] = "var(--rounded-full)";
            break;
        case "ROUNDED_RECTANGLE":
            customImageStyle["--rounded"] = "var(--rounded-md)";
            break;
        default:
            break;
    }

    switch (height) {
        case "SM":
            customImageStyle["--height"] = "var(--sizing-sm)";
            break;
        case "MD":
            customImageStyle["--height"] = "var(--sizing-md)";
            break;
        case "LG":
            customImageStyle["--height"] = "var(--sizing-lg)";
            break;
    }

    return (
        <img
            {...props}
            style={{ ...customImageStyle, ...style }}
            src={url}
            className={`${styles.customImage} ${className}`}
        />
    );
};

export default CustomImage;
