import styles from "./FlexOneContainer.module.css";

const FlexOneContainer = ({
    isYScrollable,
    isXScrollable,
    isPaddedForScrollbar,
    style,
    className,
    children,
    ...props
}) => {
    const flexOneStyle = {};
    flexOneStyle["--overflow-x"] = isXScrollable ? "scroll" : "hidden";
    flexOneStyle["--overflow-y"] = isYScrollable ? "scroll" : "hidden";
    flexOneStyle["--pr"] =
        isYScrollable && isPaddedForScrollbar ? "var(--sizing-mx)" : undefined;
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
