import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import useLinkUpStore from "../../../shared/store/store";

const useAgency = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const { data, isPending, error } = useQuery({
        queryKey: ["/api/companies/artists"],
        queryFn: () => axiosReturnsData("GET", "/api/companies/artists"),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setArtistArray(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return {
        error,
        isPending,
    };
};

export default useAgency;
