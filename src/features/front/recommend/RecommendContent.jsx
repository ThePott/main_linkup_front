import GridContainer from "../../../package/gridContainer/GridContainer";
import SuggestedCard from "../../../package/SuggestedCard";

const RecommendContent = ({ artists }) => {
  return (
    <GridContainer cols="auto" colMinWidth={200}>
      {artists.map((artist) => (
        <li key={artist.id}>
          <SuggestedCard
            artistImg={artist.img_face}
            artistName={artist.name}
            artistId={artist.id}
          />
        </li>
      ))}
    </GridContainer>
  );
};

export default RecommendContent;
