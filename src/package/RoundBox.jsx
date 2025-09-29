import styles from "./RoundBox.module.css";

/**
 * {"none" | "xs" | "sm" | "md" | "lg" | "xl"}
 */
const RoundBox = ({
    isShadowed = true,
    padding = "none",
    textAlign = "center",
    children,
    style,
    className,
    ...rest
}) => {
    const styleForVar = {};
    styleForVar["--shadow"] = isShadowed ? "var(--drop-shadow-md)" : 0;
    styleForVar["--padding"] = padding === "none" ? 0 : `var(--spacing-${padding.toLowerCase()})`;
    styleForVar["--border"] = isShadowed ? "none" : "1px solid var(--color-dimdimdim)";
    styleForVar["--border-color-hover"] = isShadowed ? "transparent" : "var(--color-dimdim)";
    styleForVar["--text-align"] = textAlign;

    return (
        <div
            className={`${styles.container} ${className}`}
            style={{ ...styleForVar, ...style }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default RoundBox;
