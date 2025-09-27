import hstackStyles from "./_Hstack.module.css";

/**
 * @param {"xs" | "sm" | "md" | "lg" | "xl"} gap
 */
const Hstack = ({ gap = "md", justify, items, style, className, children, ...props }) => {
    const defaultStyle = {};
    defaultStyle["--justify"] = justify ? justify : "start";
    defaultStyle["--items"] = items ? items : "stretch";
    defaultStyle["--gap"] = gap === "none" ? 0 : `var(--spacing-${gap})`;

    return (
        <div
            {...props}
            style={{ ...defaultStyle, ...style }}
            className={`${hstackStyles.hstack} ${className}`}
        >
            {children}
        </div>
    );
};

export default Hstack;
