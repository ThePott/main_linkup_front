import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import useLinkUpStore from "../store/store";
import { axiosReturnsData } from "./axiosInstance";
import { useEffect } from "react";

const useIdolQuery = () => {
    const endpoint = "/api/idol";
    const [searchParams, _setSearchParams] = useSearchParams();
    const queryParams = searchParams.get("query");
    const queryKey = queryParams ? `${endpoint}/${queryParams}` : endpoint;

    const setRecommendArtistArray = useLinkUpStore((state) => state.setRecommendArtistArray);
    const setSearchResultArray = useLinkUpStore((state) => state.setSearchResultArray);

    const {
        data,
        isPending: isPendingIdol,
        error: errorIdol,
    } = useQuery({
        queryKey: [queryKey],
        queryFn: () => axiosReturnsData("GET", queryKey),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        if (queryParams) {
            const resultArray = typeof data === "object" ? [data] : data;
            setSearchResultArray(resultArray);
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
