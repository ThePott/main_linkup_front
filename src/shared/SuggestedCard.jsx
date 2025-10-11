import { useNavigate } from "react-router";
import CustomImageCard from "./CustomImageCard/CustomImageCard";

const SuggestedCard = ({ artist }) => {
    const navigate = useNavigate();
    const { id: artistId, torso_url: imgUrl } = artist;

    const handleClick = () => {
        navigate(`/detail/artist/${artistId}`);
    };

    return <CustomImageCard onClick={handleClick} url={imgUrl} />;
};

export default SuggestedCard;
