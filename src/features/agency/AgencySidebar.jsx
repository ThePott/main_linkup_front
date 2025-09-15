import CustomButton from "../../package/customButton/CustomButton";
import { Vstack } from "../../package/layout";
import RoundBox from "../../package/RoundBox";
import { dummyAgencyUser } from "../../shared/store/dummyThepott.js";
import useLinkUpStore from "../../shared/store/store";

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
        <CustomButton
            onClick={handleClick}
            style={{ textAlign: "end" }}
            onDoubleClick={handleDoubleClick}
        >
            {artist.name}
        </CustomButton>
    );
};

const AgencySidebar = () => {
    const user = dummyAgencyUser;
    const groupArtistEntryArray = Object.entries(user.groupToArtistArray);
    const soloArtistArray = user.soloArtistArray;

    return (
        <Vstack>
            {groupArtistEntryArray.map((entry) => (
                <RoundBox key={entry[0]} style={{ textAlign: "start" }}>
                    <Vstack>
                        <p>{entry[0]}</p>
                        {entry[1].map((artist) => (
                            <ArtistButton key={artist.id} artist={artist} />
                        ))}
                    </Vstack>
                </RoundBox>
            ))}
            {soloArtistArray.map((artist) => (
                <ArtistButton key={artist.id} artist={artist} />
            ))}
        </Vstack>
    );
};

export default AgencySidebar;
