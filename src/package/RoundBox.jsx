import React from "react";
import styles from "./RoundBox.module.css";

const paddingSize = {
    XS: "var(--spacing-xs)",
    SM: "var(--spacing-sm)",
    MD: "var(--spacing-md)",
    LG: "var(--spacing-lg)",
    XL: "var(--spacing-xl)",
};

const RoundBox = ({ padding, children, style, className, ...rest }) => {
    const paddingValue = padding ? paddingSize[padding.toUpperCase()] : null;

    return (
        <div
            className={[styles.container, className].filter(Boolean).join(" ")}
            style={{
                padding: paddingValue,
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default RoundBox;
