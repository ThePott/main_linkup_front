import styles from "./SearchContent.module.css";
import { Vstack } from "../../../package/layout";
import useLinkUpStore from "../../../shared/store/store";
import useEventsForSearch from "./useEventsForSearch";
import RoundBox from "../../../package/RoundBox";
import GridContainer from "../../../package/gridContainer/GridContainer";
import CustomImageCard from "../../../shared/CustomImageCard/CustomImageCard";
import Skeleton from "../../../package/skeleton/Skeleton";

const EventBoxEmpty = () => {
    return (
        <RoundBox padding="lg" isShadowed={false} className={styles.eventBoxEmpty}>
            <p>등록된 일정이 없어요</p>
        </RoundBox>
    );
};

const EventBox = ({ event }) => {
    return (
        <RoundBox padding="lg" isShadowed={false}>
            <p>{event.start_time}</p>
            <p>{event.title}</p>
            <p>{event.description}</p>
        </RoundBox>
    );
};

const EventColumn = ({ eventArray }) => {
    if (eventArray.length === 0) {
        return <EventBoxEmpty />;
    }
    return (
        <Vstack className={styles.eventColumn}>
            {eventArray.map((event) => (
                <EventBox event={event} />
            ))}
        </Vstack>
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

const SearchResult = ({ artist, isPending }) => {
    const imageUrl =
        artist.banner_url || artist.torso_url || artist.face_url || artist.profile_image;
    const eventDict = useLinkUpStore((state) => state.eventDict);
    const eventArray = eventDict[artist.id] ?? [];
    return (
        <>
            <CustomImageCard url={imageUrl} style={{ boxShadow: "var(--drop-shadow-md)" }} />
            {isPending && eventArray.length === 0 && <EventColumnSkeleton />}
            {!isPending && <EventColumn eventArray={eventArray} />}
        </>
    );
};

const SearchContent = () => {
    const { isPendingEvents, errorEvents } = useEventsForSearch();
    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);

    return (
        <GridContainer cols={2} gap="xl">
            {searchResultArray.map((artist) => (
                <SearchResult artist={artist} isPending={isPendingEvents} />
            ))}
        </GridContainer>
    );
};

export default SearchContent;
