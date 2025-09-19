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
    const lowerCasedHeight = height.toLocaleLowerCase();
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

    customImageStyle["--height"] = `var(--sizing-${lowerCasedHeight})`;
    customImageStyle["--width"] =
        shape === "CIRCLE" ? `var(--sizing-${lowerCasedHeight})` : "100%";

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
