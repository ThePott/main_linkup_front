import GridContainer from "../../package/gridContainer/GridContainer.jsx";

const GridCardContainer = ({ children, cols = "auto", colMinWidth = "var(--sizing-md)", ...props}) => {
  return (
    <div>
      <GridContainer cols={cols} colMinWidth={colMinWidth} {...props}>
        {children}
      </GridContainer>
    </div>
  );
};

export default GridCardContainer;