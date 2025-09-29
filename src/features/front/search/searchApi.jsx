import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import useLinkUpStore from "../../../shared/store/store";

const getEvents = async (artistId) => {
    const data = await axiosReturnsData("GET", `/api/events/?artist_id=${artistId}`);
    return data.events;
};

export const getThenStoreEventDict = async (artistIdArray) => {
    const promiseArray = artistIdArray.map((artistId) => getEvents(artistId));

    const resolvedArray = await Promise.all(promiseArray);

    const eventDict = artistIdArray.reduce((acc, artistId, index) => {
        acc[artistId] = resolvedArray[index];
        return acc;
    }, {});

    useLinkUpStore.setState({ eventDict });
};
