import GridContainer from "../../../package/gridContainer/GridContainer";
import SuggestedCard from "../../../shared/SuggestedCard";

const RecommendContent = ({ artists, type, imgWidth, borderRadius }) => {
    return (
        <GridContainer cols="auto" colMinWidth={130}>
            {artists.map((artist) => (
                <li key={artist.id}>
                    <SuggestedCard
                        artist={artist}
                        type={type}
                        imgWidth={imgWidth}
                        borderRadius={borderRadius}
                    />
                </li>
            ))}
        </GridContainer>
    );
};

export default RecommendContent;
