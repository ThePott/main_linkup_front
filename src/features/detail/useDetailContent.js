import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosReturnsData } from "../../shared/services/axiosInstance";

const useDetailArtistQuery = (artistId) => {
    const [currentArtist, setCurrentArtist] = useState(null);
    const endpoint = `/api/idol?artist_id=${artistId}`;
    const {
        data,
        isPending: isPendingDetailArtist,
        error: errorDetailArtist,
    } = useQuery({
        queryKey: [endpoint, artistId],
        queryFn: () => axiosReturnsData("GET", endpoint),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setCurrentArtist(data.artists[0]);
    }, [data]);

    return { currentArtist, isPendingDetailArtist, errorDetailArtist };
};

const useDetailContent = (artistId) => {
    const artistQueryReturns = useDetailArtistQuery(artistId);

    return { ...artistQueryReturns };
};

export default useDetailContent;
