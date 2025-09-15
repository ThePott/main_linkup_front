import styles from "./GridContainer.module.css";

const GridContainer = ({
    cols,
    colMinWidth,
    className,
    children,
    ...props
}) => {
    const isAutoFit = cols === "auto" && typeof colMinWidth === "number";

    const gridClass = isAutoFit ? styles.gridAuto : styles.gridFixed;

    const customProps = isAutoFit
        ? {
              "--min-width": `${colMinWidth}px`,
              "--max-width": `${colMinWidth * 2}px`,
          }
        : {
              "--cols": cols,
          };

    return (
        <div
            {...props}
            className={`${styles.grid} ${gridClass} ${className}`}
            style={customProps}
        >
            {children}
        </div>
    );
};

export default GridContainer;
