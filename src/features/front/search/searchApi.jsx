import { format } from "date-fns";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";

const getEvents = async (artistId) => {
    const start_date = format(new Date(), "yyyy-MM-dd");
    const url = `/api/events/?start_date=${start_date}&artist_id=${artistId}`;

    const data = await axiosReturnsData("GET", url);

    return data.events;
};

export const getThenStoreEventDict = async (artistIdArray) => {
    const promiseArray = artistIdArray.map((artistId) => getEvents(artistId));

    const resolvedArray = await Promise.all(promiseArray);

    const eventDict = artistIdArray.reduce((acc, artistId, index) => {
        acc[artistId] = resolvedArray[index];
        return acc;
    }, {});

    return eventDict;
};
