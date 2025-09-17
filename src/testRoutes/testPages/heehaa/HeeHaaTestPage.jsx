import RecommendContent from "../../../features/front/recommend/RecommendContent";
import ArtistCard from "../../../shared/ArtistCard";
import CircleIcon from "../../../shared/CircleIcon";
import mockData from "../../../shared/store/dummyHeehaa.json";

const HeeHaaTestPage = () => {
    const artists = mockData;
    return (
        <ul>
            <RecommendContent artists={artists} type="torso" imgWidth={200} />
            <RecommendContent artists={artists} type="face" />
            {artists.map((artist) => (
                <>
                    <CircleIcon
                        key={artist.id}
                        artist={artist}
                        type="face"
                        imgWidth={150}
                        borderRadius="50%"
                    />
                    <ArtistCard artist={artist} type="banner" />
                </>
            ))}
        </ul>
    );
};

export default HeeHaaTestPage;
