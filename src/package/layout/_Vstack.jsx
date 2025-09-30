import CenterInRow from "./_CenterInRow";
import styles from "./_Vstack.module.css";

const BaseVstack = ({
    gap = "md",
    justify = "start",
    items = "stretch",
    style,
    className,
    children,
    ...props
}) => {
    const defaultClassName = styles.vstack;

    const vstackStyle = {};
    vstackStyle["--justify"] = justify;
    vstackStyle["--items"] = items;
    vstackStyle["--gap"] = gap === "non" ? 0 : `var(--spacing-${gap})`;

    return (
        <div
            {...props}
            style={{ ...vstackStyle, ...style }}
            className={`${defaultClassName}  ${className}`}
        >
            {children}
        </div>
    );
};

const Vstack = ({ center, children, ...props }) => {
    if (!center) {
        return <BaseVstack {...props}>{children}</BaseVstack>;
    }

    return (
        <CenterInRow>
            <BaseVstack {...props}>{children}</BaseVstack>
        </CenterInRow>
    );
};

export default Vstack;
