import CenterInRow from "./_CenterInRow";
import { gapToClassName, spacingToCssVar } from "./layoutUtils";
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
    const gapClassName = gapToClassName[gap];

    const vstackStyle = {};
    vstackStyle["--justify"] = justify;
    vstackStyle["--items"] = items;
    vstackStyle["--gap"] = spacingToCssVar[gap];

    return (
        <div
            {...props}
            style={{ ...vstackStyle, ...style }}
            className={`${defaultClassName} ${gapClassName} ${className}`}
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
