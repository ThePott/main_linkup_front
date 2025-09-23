import styles from "./AgencySidebar.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import { Vstack } from "../../../package/layout";
import useLinkUpStore from "../../../shared/store/store";
import AgencyArtistModal from "./AgencyArtistModal";

const ArtistLabel = ({ artist_type, children }) => {
    const style = {};
    style["--text-align"] = artist_type === "group" ? "center" : "start";
    return (
        <p style={style} className={styles.artistLabel}>
            {children}
        </p>
    );
};

const ArtistButton = ({ artist }) => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedArtist = useLinkUpStore(
        (state) => state.setSelectedArtist,
    );

    const name = artist.stage_name ?? artist.group_name;

    const handleClick = () => {
        setSelectedArtist(artist);
    };

    const handleDoubleClick = () => {
        setModalKey("agencySidebar");
    };

    return (
        <CustomButton
            className={styles.artistButton}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <ArtistLabel>{name}</ArtistLabel>
        </CustomButton>
    );
};

const AgencySidebar = () => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedArtist = useLinkUpStore(
        (state) => state.setSelectedArtist,
    );
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const groupArray = artistArray.filter(
        (artist) => artist.artist_type === "group",
    );

    const individualArray = artistArray.filter(
        (artist) => artist.artist_type === "individual",
    );

    const handleAdd = () => {
        setSelectedArtist(null);
        setModalKey("agencySidebar");
    };

    return (
        <>
            <AgencyArtistModal />
            <Vstack className={styles.sidebar}>
                {groupArray.map((group) => (
                    <ArtistButton
                        key={`${group.group_name}__${group.stage_name}`}
                        artist={group}
                    />
                ))}
                {individualArray.map((individual) => (
                    <ArtistButton
                        key={individual.stage_name}
                        artist={individual}
                    />
                ))}
                <CustomButton isOn={true} onClick={handleAdd}>
                    추가
                </CustomButton>
            </Vstack>
        </>
    );
};

export default AgencySidebar;
