import { useEffect } from "react";
import { Vstack } from "../../../package/layout";
import ArtistCardNew from "../../../shared/ArtistCardNew/ArtistCardNew";
import GridCardContainer from "../../../shared/GridCardContainer/GridCardContainer";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import useLinkUpStore from "../../../shared/store/store";
import CustomButton from "../../../package/customButton/CustomButton";

const getEventsOfArtist = async (artist) => {
    const data = await axiosReturnsData("GET", `/api/events/?artist_id=${artist.id}`);
    return data.events;
};

const getEventArrayOfManyArtist = async (artistArray) => {
    const promiseArray = artistArray.map((artist) => getEventsOfArtist(artist));

    const resolvedArray = await Promise.all(promiseArray);
    const eventArray = resolvedArray.flat();
    useLinkUpStore.setState({ eventArray });
};

const SearchContent = () => {
    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);

    const eventArray = useLinkUpStore((state) => state.eventArray);
    useEffect(() => {
        getEventArrayOfManyArtist(searchResultArray);
    }, [searchResultArray]);

    return (
        <Vstack gap="lg">
            <GridCardContainer>
                {searchResultArray.map((artist) => (
                    <ArtistCardNew key={artist.id} artist={artist} />
                ))}
            </GridCardContainer>
            {eventArray.map((event) => (
                <CustomButton>
                    <p>
                        {event.start_time} {event.title}
                    </p>
                    <p>{event.description}</p>
                </CustomButton>
            ))}
            <p>팬 포스트</p>
        </Vstack>
    );
};

export default SearchContent;
