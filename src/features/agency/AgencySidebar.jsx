import CustomButton from "../../package/customButton/CustomButton";
import { Vstack } from "../../package/layout";
import RoundBox from "../../package/RoundBox";
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
            <CustomButton onClick={handleAdd}>추가</CustomButton>
        </Vstack>
    );
};

export default AgencySidebar;
