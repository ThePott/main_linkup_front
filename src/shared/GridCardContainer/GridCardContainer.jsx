import GridContainer from "../../package/gridContainer/GridContainer.jsx";

const GridCardContainer = ({ children, ...props}) => {
  return (
    <div>
      <GridContainer {...props} cols="auto" colMinWidth="var(--sizing-md)" >
        {children}
      </GridContainer>
    </div>
  );
};

export default GridCardContainer;