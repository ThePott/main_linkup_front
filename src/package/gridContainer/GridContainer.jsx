import styles from "./GridContainer.module.css";

const GridContainer = ({
    cols,
    colMinWidth,
    style,
    className,
    children,
    ...props
}) => {
    const isAutoFit = cols === "auto";

    const gridStyle = {};
    if (isAutoFit) {
        const minWidth =
            typeof colMinWidth === "number" ? `${colMinWidth}px` : colMinWidth;
        gridStyle["--grid-cols"] =
            `repeat(auto-fill, minmax(${minWidth}, 1fr))`;
    } else {
        gridStyle["--grid-cols"] = `repeat(${cols}, 1fr)`;
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
