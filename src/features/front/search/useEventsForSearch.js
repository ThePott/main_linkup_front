import { useQuery } from "@tanstack/react-query";
import useLinkUpStore from "../../../shared/store/store";
import { getThenStoreEventDict } from "./searchApi";
import { useEffect } from "react";

const useEventsForSearch = () => {
    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);
    const setEventDict = useLinkUpStore((state) => state.setEventDict);
    const artistIdArray = searchResultArray.map((result) => result.id);

    const endpoint = "/api/events/?artist_id=";
    const {
        data,
        isPending: isPendingEvents,
        error: errorEvents,
    } = useQuery({
        queryKey: [endpoint, ...artistIdArray],
        queryFn: () => getThenStoreEventDict(artistIdArray),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setEventDict(data);
    }, [data]);

    return { isPendingEvents, errorEvents };
};

export default useEventsForSearch;
