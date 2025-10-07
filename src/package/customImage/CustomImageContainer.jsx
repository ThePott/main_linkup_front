import styles from "./CustomImageContainer.module.css";

const CustomImageContainer = ({ shape, height, style, className, children, ...props }) => {
    const lowerCasedHeight = height.toLocaleLowerCase();
    const styleForVar = {};
    switch (shape) {
        case "CIRCLE":
            styleForVar["--rounded"] = "var(--rounded-full)";
            break;
        case "ROUNDED_RECTANGLE":
            styleForVar["--rounded"] = "var(--rounded-md)";
            break;
        default:
            break;
    }

    styleForVar["--height"] = `var(--sizing-${lowerCasedHeight})`;
    styleForVar["--width"] = shape === "CIRCLE" ? `var(--sizing-${lowerCasedHeight})` : "100%";

    return (
        <div
            {...props}
            style={{ ...styleForVar, ...style }}
            className={`${styles.container} ${className}`}
        >
            {children}
        </div>
    );
};

export default CustomImageContainer;
