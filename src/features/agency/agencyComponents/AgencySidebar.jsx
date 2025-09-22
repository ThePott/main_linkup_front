import styles from "./AgencySidebar.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import { Vstack } from "../../../package/layout";
import RoundBox from "../../../package/RoundBox";
import useLinkUpStore from "../../../shared/store/store";

const GroupLabel = ({ children }) => {
    return <h2 className={styles.groupLabel}>{children}</h2>;
};
const ArtistLabel = ({ children }) => {
    return <h2 className={styles.artistLabel}>{children}</h2>;
};

const ArtistButton = ({ artist }) => {
    const setIsModalOn = useLinkUpStore((state) => state.setIsModalOn);
    const setSelectedArtist = useLinkUpStore(
        (state) => state.setSelectedArtist,
    );

    const handleClick = () => {
        console.log({ artist });
    };

    const handleDoubleClick = () => {
        setIsModalOn(true);
        setSelectedArtist(artist);
    };

    return (
        <CustomButton onClick={handleClick} onDoubleClick={handleDoubleClick}>
            <ArtistLabel>{artist.name}</ArtistLabel>
        </CustomButton>
    );
};

const AgencySidebar = () => {
    const setIsModalOn = useLinkUpStore((state) => state.setIsModalOn);
    const user = useLinkUpStore((state) => state.user);
    if (!user) {
        console.error("---- null user");
        return null;
    }

    if (user.role !== "admin") {
        console.log("---- not admin");
        return null;
        // throw new Error("---- ERROR OCCURRED: 소속사 말고는 접근이 불가능해야 합니다")
    }

    const soloArtistArray = user.managingArtistArray.filter(
        (artist) => !artist.is_group,
    );
    const groupArtistDict = Object.groupBy(
        user.managingArtistArray.filter((artist) => artist.is_group),
        ({ group_name }) => group_name,
    );
    const groupArtistEntryArray = Object.entries(groupArtistDict);

    const handleAdd = () => {
        setIsModalOn(true);
    };

    return (
        <Vstack className={styles.sidebar}>
            {groupArtistEntryArray.map((entry) => (
                <RoundBox
                    key={entry[0]}
                    style={{ textAlign: "start", margin: 0 }}
                    padding="MD"
                >
                    <Vstack gap="none">
                        <ArtistLabel>{entry[0]}</ArtistLabel>
                        <Vstack>
                            {entry[1].map((artist) => (
                                <ArtistButton key={artist.id} artist={artist} />
                            ))}
                        </Vstack>
                    </Vstack>
                </RoundBox>
            ))}
            <Vstack gap="none">
                <GroupLabel>Solo Artists</GroupLabel>
                <Vstack>
                    {soloArtistArray.map((artist) => (
                        <ArtistButton key={artist.id} artist={artist} />
                    ))}
                </Vstack>
            </Vstack>
            <CustomButton isOn={true} onClick={handleAdd}>
                추가
            </CustomButton>
        </Vstack>
    );
};

export default AgencySidebar;
