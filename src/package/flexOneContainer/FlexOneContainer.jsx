import styles from "./FlexOneContainer.module.css";

const FlexOneContainer = ({
    isYScrollable,
    isXScrollable,
    style,
    className,
    children,
    ...props
}) => {
    const flexOneStyle = {};
    flexOneStyle["--overflow-x"] = isXScrollable ? "scroll" : "hidden";
    flexOneStyle["--overflow-y"] = isYScrollable ? "scroll" : "hidden";
    return (
        <div
            {...props}
            style={{ ...flexOneStyle, ...style }}
            className={`${styles.flexOne} ${className}`}
        >
            {children}
        </div>
    );
};

export default FlexOneContainer;
