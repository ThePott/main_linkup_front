import { useMutation, useQuery } from "@tanstack/react-query";
import { getCompaniesArtists } from "./agencyApi";
import { useEffect } from "react";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";

export const useAgency = () => {
    // data is stored right after fetch
    const { isLoading, error } = useQuery({
        queryKey: ["companiesArtists"],
        queryFn: () => getCompaniesArtists(),
    });

    useEffect(() => {
        if (!error) {
            return;
        }
        console.error(error);
    }, [error]);

    return {
        error,
        isLoading,
    };
};

export const useArtistSidebar = () => {
    const postArtistMutation = useMutation({
        mutationFn: (body) => {
            return axiosReturnsData("POST", "/api/companies/artists", body);
        },
    });
    const putArtistMutation = useMutation({
        mutationFn: (body) => {
            return axiosReturnsData("PUT", "/api/companies/artists", body);
        },
    });
    const deleteArtistMutation = useMutation({
        mutationFn: (body) => {
            return axiosReturnsData("DELETE", "/api/companies/artists", body);
        },
    });

    return {
        postArtistMutation,
        putArtistMutation,
        deleteArtistMutation,
    };
};
