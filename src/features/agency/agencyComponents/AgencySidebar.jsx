import styles from "./AgencySidebar.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import { Vstack } from "../../../package/layout";
import useLinkUpStore from "../../../shared/store/store";

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
    const setIsModalOn = useLinkUpStore((state) => state.setIsModalOn);
    const setSelectedArtist = useLinkUpStore(
        (state) => state.setSelectedArtist,
    );

    const name = artist.stage_name ?? artist.group_name;

    const handleClick = () => {
        console.log({ artist });
    };

    const handleDoubleClick = () => {
        setIsModalOn(true);
        setSelectedArtist(artist);
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
    const setIsModalOn = useLinkUpStore((state) => state.setIsModalOn);
    // const user = useLinkUpStore((state) => state.user);
    // if (!user) {
    //     console.error("---- null user");
    //     return null;
    // }
    //
    // if (user.user_type !== "company") {
    //     console.log("---- not admin");
    //     return null;
    //     // throw new Error("---- ERROR OCCURRED: 소속사 말고는 접근이 불가능해야 합니다")
    // }
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const groupArray = artistArray.filter(
        (artist) => artist.artist_type === "group",
    );
    const individualArray = artistArray.filter(
        (artist) => artist.artist_type === "individual",
    );

    // const soloArtistArray = user.managingArtistArray.filter(
    //     (artist) => !artist.is_group,
    // );
    // const groupArtistDict = Object.groupBy(
    //     user.managingArtistArray.filter((artist) => artist.is_group),
    //     ({ group_name }) => group_name,
    // );
    // const groupArtistEntryArray = Object.entries(groupArtistDict);
    //
    const handleAdd = () => {
        setIsModalOn(true);
    };

    return (
        <Vstack className={styles.sidebar}>
            {groupArray.map((group) => (
                <ArtistButton artist={group} />
            ))}
            {individualArray.map((individual) => (
                <ArtistButton artist={individual} />
            ))}
            {/* {groupArtistEntryArray.map((entry) => ( */}
            {/*     <RoundBox */}
            {/*         key={entry[0]} */}
            {/*         style={{ textAlign: "start", margin: 0 }} */}
            {/*         padding="MD" */}
            {/*     > */}
            {/*         <Vstack gap="none"> */}
            {/*             <ArtistLabel>{entry[0]}</ArtistLabel> */}
            {/*             <Vstack> */}
            {/*                 {entry[1].map((artist) => ( */}
            {/*                     <ArtistButton key={artist.id} artist={artist} /> */}
            {/*                 ))} */}
            {/*             </Vstack> */}
            {/*         </Vstack> */}
            {/*     </RoundBox> */}
            {/* ))} */}
            {/* <Vstack gap="none"> */}
            {/*     <GroupLabel>Solo Artists</GroupLabel> */}
            {/*     <Vstack> */}
            {/*         {soloArtistArray.map((artist) => ( */}
            {/*             <ArtistButton key={artist.id} artist={artist} /> */}
            {/*         ))} */}
            {/*     </Vstack> */}
            {/* </Vstack> */}
            <CustomButton isOn={true} onClick={handleAdd}>
                추가
            </CustomButton>
        </Vstack>
    );
};

export default AgencySidebar;
