import styles from "./_Container.module.css";

/**
 * @param { "md" | "lg" } width
 * @param { "none" | "xs" | "sm" | "md" | "lg" | "xl"}
 */
const Container = ({ width = "lg", marginTop = "lg", style, className, children }) => {
    const styleForVar = {};
    styleForVar["--width"] = `var(--container-${width})`;
    styleForVar["--margin-top"] = marginTop === "none" ? 0 : `var(--spacing-${marginTop})`;
    return (
        <div style={{ ...styleForVar, ...style }} className={`${styles.container} ${className}`}>
            {children}
        </div>
    );
};

export default Container;
