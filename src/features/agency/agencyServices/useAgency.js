import { useQuery } from "@tanstack/react-query";
import { getCompaniesArtists } from "./agencyApi";
import { useEffect } from "react";

export const useAgency = () => {
    // data: token
    const { data, isLoading, error } = useQuery({
        queryKey: ["companiesArtists"],
        queryFn: () => getCompaniesArtists(),
    });

    useEffect(() => {
        if (!error) {
            return;
        }
        console.error(error);
    }, [error]);

    return { error, isLoading };
};
