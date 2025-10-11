import styles from "./ArtistIconBar.module.css";
import { useNavigate } from "react-router";
import { Hstack } from "../../package/layout";
import CustomImageIcon from "../CustomImageIcon/CustomImageIcon";

const ArtistIconBar = ({ artistArray }) => {
    const navigate = useNavigate();

    if (!artistArray || artistArray.length === 0) {
        return null;
    }

    return (
        <Hstack className={styles.container}>
            {artistArray.map((artist) => (
                <CustomImageIcon
                    key={artist.artist_id ?? artist.id}
                    url={artist.artist_image_url}
                    onClick={() => {
                        navigate(`/detail/artist/${artist.artist_id}`);
                    }}
                />
            ))}
        </Hstack>
    );
};

export default ArtistIconBar;
