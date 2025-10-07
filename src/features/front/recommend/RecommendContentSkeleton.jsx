import GridContainer from "../../../package/gridContainer/GridContainer";
import Container from "../../../package/layout/_Container";
import Skeleton from "../../../package/skeleton/Skeleton";

const RecommendContentSkeleton = () => {
    return (
        <Container>
            <GridContainer cols="auto" colMinWidth="200px">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        skeletonVariant="BOX"
                        heightInPixel={200}
                        widthInPixel={180}
                    />
                ))}
            </GridContainer>
        </Container>
    );
};

export default RecommendContentSkeleton;
