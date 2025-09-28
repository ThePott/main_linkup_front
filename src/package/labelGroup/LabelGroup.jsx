import styles from "./LabelGroup.module.css";
import { Vstack } from "../layout";

const BigLabel = ({ className, children, ...props }) => {
    return (
        <p {...props} className={`${styles.bigLabel} ${className}`}>
            {children}
        </p>
    );
};
const SmallLabel = ({ className, children, ...props }) => {
    return (
        <p {...props} className={`${styles.smallLabel} ${className}`}>
            {children}
        </p>
    );
};

const LabelGroup = ({ isRed, style, children }) => {
    const styleForVar = {};
    styleForVar["--color"] = isRed ? "var(--color-red)" : "var(--color-muted)";

    return (
        <Vstack style={{ ...styleForVar, ...style }} className={styles.container} gap="none">
            {children}
        </Vstack>
    );
};

LabelGroup.BigLabel = BigLabel;
LabelGroup.SmallLabel = SmallLabel;

export default LabelGroup;
