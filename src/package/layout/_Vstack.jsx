import CenterInRow from "./_CenterInRow";
import { gapToClassName } from "./layoutUtils";
import styles from "./_Vstack.module.css";

const BaseVstack = ({ gap = "md", className, children, ...props }) => {
    const defaultClassName = styles.vstack;
    const gapClassName = gapToClassName[gap];

    return (
        <div
            {...props}
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
