import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router";
import useLinkUpStore from "../store/store";
import { axiosReturnsData } from "./axiosInstance";
import { useEffect } from "react";

const useIdolQuery = () => {
    const endpoint = "/api/idol";
    const [searchParams, _setSearchParams] = useSearchParams();
    const queryParams = searchParams.get("query");
    // const queryKey = queryParams ? `${endpoint}/${queryParams}` : endpoint;
    const queryKey = queryParams ? `${endpoint}?artist_name=${queryParams}` : endpoint;
    const location = useLocation();
    const pathname = location.pathname;

    const setRecommendArtistArray = useLinkUpStore((state) => state.setRecommendArtistArray);
    const setSearchResultArray = useLinkUpStore((state) => state.setSearchResultArray);

    const {
        data,
        isPending: isPendingIdol,
        error: errorIdol,
    } = useQuery({
        queryKey: [queryKey],
        queryFn: () => axiosReturnsData("GET", queryKey),
        enabled: pathname === "/",
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        if (queryParams) {
            // const resultArray = typeof data === "object" ? [data] : data;
            // setSearchResultArray(resultArray);
            setSearchResultArray(data.artists);
            return;
        }

        setRecommendArtistArray(data.artists);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { isPendingIdol, errorIdol };
};

const useIdol = () => {
    const queryReturn = useIdolQuery();

    return { ...queryReturn };
};

export default useIdol;
