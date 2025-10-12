import styles from "./AgencySidebar.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import { Vstack } from "../../../package/layout";
import useLinkUpStore from "../../../shared/store/store";
import AgencyArtistModal from "./AgencyArtistModal";
import RoundBox from "../../../package/RoundBox";
import { memo, useEffect, useState } from "react";
import PlusIcon from "../../../package/icons/PlusIcon";
import FlexOneContainer from "../../../package/flexOneContainer/FlexOneContainer";

const ArtistButton = memo(({ artist, isOn }) => {
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedArtist = useLinkUpStore((state) => state.setSelectedArtist);

    const name = artist.stage_name || artist.group_name;

    const styleForVar = {};
    styleForVar["--text-align"] = artist.stage_name ? "start" : "center";
    styleForVar["--color"] = isOn
        ? "var(--color-vivid-inverted)"
        : isMouseEntered
          ? "var(--color-vivid)"
          : "var(--color-muted)";

    const handleClick = () => {
        setSelectedArtist(artist);
    };

    const handleDoubleClick = () => {
        setModalKey("agencySidebar");
    };

    return (
        <CustomButton
            isOn={isOn}
            style={styleForVar}
            className={styles.artistButton}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={() => setIsMouseEntered(true)}
            onMouseLeave={() => setIsMouseEntered(false)}
        >
            {name}
        </CustomButton>
    );
});

const ArtistButtonGroup = memo(({ artistArray, isOnArray }) => {
    const groupArtistIndex = artistArray.findIndex((artist) => !artist.stage_name);
    const groupArtist = artistArray[groupArtistIndex];
    const groupIsOn = isOnArray[groupArtistIndex];
    const memberArtistArray = [...artistArray].filter((_, index) => index !== groupArtistIndex);
    const memberIsOnArray = [...isOnArray].slice((_, index) => index !== groupArtistIndex);
    return (
        <RoundBox isShadowed={false} padding="md">
            <Vstack gap="sm">
                {groupArtist && <ArtistButton isOn={groupIsOn} artist={groupArtist} />}
                {memberArtistArray.map((artist, index) => (
                    <ArtistButton key={artist.id} isOn={memberIsOnArray[index]} artist={artist} />
                ))}
            </Vstack>
        </RoundBox>
    );
});

const PlusButton = memo((props) => {
    return (
        <CustomButton {...props}>
            <PlusIcon className={styles.plusIcon} />
        </CustomButton>
    );
});

const AgencySidebar = () => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const setSelectedArtist = useLinkUpStore((state) => state.setSelectedArtist);
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const groupedArtistAndIsOn = artistArray.reduce((acc, cur) => {
        const existingArtistArray = acc[String(cur.group_name)]?.artistArray ?? [];
        const existingIsOnArray = acc[String(cur.group_name)]?.isOnArray ?? [];
        acc[String(cur.group_name)] = {
            artistArray: [...existingArtistArray, cur],
            isOnArray: [...existingIsOnArray, cur.id === selectedArtist?.id],
        };
        return acc;
    }, {});

    const { null: soloArtistAndIsOnDict, ...groupArtistRecords } = groupedArtistAndIsOn;
    const groupedEntryArray = Object.entries(groupArtistRecords);
    const soloArtistArray = soloArtistAndIsOnDict?.artistArray ?? [];
    const soloIsOnArray = soloArtistAndIsOnDict?.isOnArray ?? [];

    const handleAdd = () => {
        setSelectedArtist(null);
        setModalKey("agencySidebar");
    };

    useEffect(() => {
        if (selectedArtist) {
            return;
        }
        if (artistArray.length === 0) {
            return;
        }
        setSelectedArtist(artistArray[0]);
    }, []);

    return (
        <>
            <AgencyArtistModal />
            <Vstack className={styles.sidebar}>
                <FlexOneContainer isYScrollable>
                    <Vstack>
                        {soloArtistArray.map((artist, index) => (
                            <ArtistButton
                                key={artist.id}
                                isOn={soloIsOnArray[index]}
                                artist={artist}
                            />
                        ))}
                        {groupedEntryArray.map((entry) => (
                            <ArtistButtonGroup
                                key={entry[0]}
                                artistArray={entry[1].artistArray}
                                isOnArray={entry[1].isOnArray}
                            />
                        ))}
                    </Vstack>
                </FlexOneContainer>
                <PlusButton onClick={handleAdd} />
            </Vstack>
        </>
    );
};

export default AgencySidebar;
