import { useNavigate } from "react-router";
import CustomImageCard from "../CustomImageCard/CustomImageCard";

const ArtistCardNew = ({ artist }) => {
    const navigate = useNavigate();

    const type = artist.stage_name ? "artist" : "group";
    const url = `/detail/${type}/${artist.id}`;
    const name = artist.stage_name || artist.group_name;
    const handleClick = () => {
        navigate(url);
    };

    return (
        <div onClick={handleClick}>
            <CustomImageCard url={artist.torso_image} />
            <div>{name}</div>
        </div>
    );
};

export default ArtistCardNew;
