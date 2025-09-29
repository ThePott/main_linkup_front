import GridContainer from "../../package/gridContainer/GridContainer.jsx";

const GridCardContainer = ({ children }) => {
    return (
        <GridContainer cols="auto" colMinWidth="sm">
            {children}
        </GridContainer>
    );
};

export default GridCardContainer;

