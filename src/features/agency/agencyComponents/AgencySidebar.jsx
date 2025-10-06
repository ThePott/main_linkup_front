import styles from "./AgencySidebar.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import { Vstack } from "../../../package/layout";
import useLinkUpStore from "../../../shared/store/store";
import AgencyArtistModal from "./AgencyArtistModal";
import RoundBox from "../../../package/RoundBox";

const ArtistButton = ({ artist }) => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedArtist = useLinkUpStore((state) => state.setSelectedArtist);

    const name = artist.stage_name || artist.group_name;

    const styleForVar = {};
    styleForVar["--text-align"] = artist.stage_name ? "start" : "center";

    const handleClick = () => {
        setSelectedArtist(artist);
    };

    const handleDoubleClick = () => {
        setModalKey("agencySidebar");
    };

    return (
        <CustomButton
            style={styleForVar}
            className={styles.artistButton}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <p className={styles.artistLabel}>{name}</p>
        </CustomButton>
    );
};

const ArtistButtonGroup = ({ group_name, artistArray }) => {
    if (group_name === "null") {
        return (
            <>
                {artistArray.map((artist) => (
                    <ArtistButton key={artist.id} artist={artist} />
                ))}
            </>
        );
    }

    const groupArtist = artistArray.find((artist) => !artist.stage_name);
    const memberArtistArray = artistArray.filter((artist) => artist.stage_name);
    return (
        <RoundBox isShadowed={false} padding="md">
            <Vstack gap="sm">
                <ArtistButton artist={groupArtist} />
                {memberArtistArray.map((artist) => (
                    <ArtistButton artist={artist} />
                ))}
            </Vstack>
        </RoundBox>
    );
};

const AgencySidebar = () => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedArtist = useLinkUpStore((state) => state.setSelectedArtist);
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const groupedArtistArray = Object.groupBy(artistArray, ({ group_name }) => group_name);
    const groupedEntryArray = Object.entries(groupedArtistArray);

    const handleAdd = () => {
        setSelectedArtist(null);
        setModalKey("agencySidebar");
    };

    return (
        <>
            <AgencyArtistModal />
            <Vstack className={styles.sidebar}>
                {groupedEntryArray.map((entry) => (
                    <ArtistButtonGroup
                        key={entry[0]}
                        group_name={entry[0]}
                        artistArray={entry[1]}
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
