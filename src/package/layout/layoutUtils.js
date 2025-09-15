import gapStyles from "./gap.module.css";

export const gapToClassName = {
    none: "",
    sm: gapStyles.gapSm,
    md: gapStyles.gapMd,
};

export const spacingToCssVar = {
    none: "0",
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)",
};
