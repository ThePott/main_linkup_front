import styles from "./SearchContent.module.css";
import { Vstack } from "../../../package/layout";
import useLinkUpStore from "../../../shared/store/store";
import useEventsForSearch from "./useEventsForSearch";
import RoundBox from "../../../package/RoundBox";
import GridContainer from "../../../package/gridContainer/GridContainer";
import CustomImageCard from "../../../shared/CustomImageCard/CustomImageCard";
import Skeleton from "../../../package/skeleton/Skeleton";
import { useNavigate } from "react-router";
import FlexOneContainer from "../../../package/flexOneContainer/FlexOneContainer";
import EventBox from "../../../package/eventBox/EventBox";

const RoundBoxFull = ({ children }) => {
    return (
        <RoundBox padding="lg" isShadowed={false} className={styles.eventBoxEmpty}>
            {children}
        </RoundBox>
    );
};

const EventColumnSkeleton = () => {
    return (
        <Vstack>
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </Vstack>
    );
};

const EventColumn = ({ artistName, eventArray }) => {
    return (
        <Vstack className={styles.eventColumn}>
            <p className={styles.artistName}>{artistName}</p>
            <FlexOneContainer isYScrollable>
                <Vstack>
                    {eventArray.length === 0 && <RoundBoxFull>등록된 일정이 없어요</RoundBoxFull>}
                    {eventArray.map((event) => (
                        <EventBox key={event.id} event={event} />
                    ))}
                </Vstack>
            </FlexOneContainer>
        </Vstack>
    );
};

const SearchResult = ({ artist, isPending, error }) => {
    const navigate = useNavigate();

    const imageUrl =
        artist.banner_url || artist.torso_url || artist.face_url || artist.profile_image;
    const eventDict = useLinkUpStore((state) => state.eventDict);
    const eventArray = eventDict[artist.id] ?? [];

    const artistName = artist.stage_name || artist.group_name || artist.name;

    const handleClick = () => {
        navigate(`/detail/artist/${artist.id}`);
    };

    return (
        <GridContainer cols={2} onClick={handleClick}>
            <CustomImageCard url={imageUrl} style={{ boxShadow: "var(--drop-shadow-md)" }} />
            {isPending && eventArray.length === 0 && <EventColumnSkeleton />}
            {!isPending && error && <RoundBoxFull>오류가 발생했어요</RoundBoxFull>}
            {!isPending && <EventColumn artistName={artistName} eventArray={eventArray} />}
        </GridContainer>
    );
};

const SearchContent = () => {
    const { isPendingEvents, errorEvents } = useEventsForSearch();
    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);

    return (
        <Vstack gap="xl">
            {searchResultArray.map((artist) => (
                <SearchResult
                    key={artist.id}
                    artist={artist}
                    isPending={isPendingEvents}
                    error={errorEvents}
                />
            ))}
        </Vstack>
    );
};

export default SearchContent;
