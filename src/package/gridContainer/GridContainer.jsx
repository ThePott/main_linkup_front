import styles from "./GridContainer.module.css";

const GridContainer = ({
    gap = "MD",
    cols,
    colMinWidth,
    rows,
    style,
    className,
    children,
    ...props
}) => {
    const isAutoFit = cols === "auto";

    const lowerCasedGap = gap.toLocaleLowerCase();

    const gridStyle = {};
    if (isAutoFit) {
        const minWidth =
            typeof colMinWidth === "number" ? `${colMinWidth}px` : colMinWidth;
        gridStyle["--grid-cols"] =
            `repeat(auto-fill, minmax(${minWidth}, 1fr))`;
    } else {
        gridStyle["--grid-cols"] = `repeat(${cols}, 1fr)`;
    }
    gridStyle["--gap"] =
        lowerCasedGap === "none" ? 0 : `var(--spacing-${lowerCasedGap})`;
    if (rows) {
        gridStyle["--grid-rows"] = `repeat(${rows})`;
        gridStyle["--height"] = "100%";
    }

    return (
        <div
            {...props}
            style={{ ...gridStyle, ...style }}
            className={`${styles.grid} ${className}`}
        >
            {children}
        </div>
    );
};

export default GridContainer;
