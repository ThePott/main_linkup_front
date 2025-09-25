import hstackStyles from "./_Hstack.module.css";

const Hstack = ({ gap = "md", justify, items, style, className, children, ...props }) => {
    const defaultClassName = hstackStyles.hstack;

    const hstackStyle = {};
    hstackStyle["--justify"] = justify ? justify : "start";
    hstackStyle["--items"] = items ? items : "stretch";
    hstackStyles["--gap"] = gap === "none" ? 0 : `var(--sizing-${gap.toLowerCase()})`;

    return (
        <div
            {...props}
            style={{ ...hstackStyle, ...style }}
            className={`${defaultClassName} ${className}`}
        >
            {children}
        </div>
    );
};

export default Hstack;
