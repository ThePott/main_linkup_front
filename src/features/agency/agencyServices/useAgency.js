import { useQuery } from "@tanstack/react-query";
import { getCompaniesArtists } from "./agencyApi";
import { useEffect } from "react";
import { axiosReturnsData } from "../../../package/commonServices/axiosVariants";
import useLinkUpStore from "../../../shared/store/store";

export const useAgency = () => {
    // data is stored right after fetch
    const { isPending, error } = useQuery({
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
        isPending,
    };
};

export const useAgencyCalendar = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const { isPending, error, refetch } = useQuery({
        queryKey: ["companiesEvent", selectedArtist?.id ?? -1],
        queryFn: async () => {
            const data = await axiosReturnsData(
                "GET",
                `/api/companies/events?artist_id=${selectedArtist?.id ?? -1}`,
            );
            // const eventArray = data.map((event) => ({
            //     ...event,
            //     start_time: new Date(event.start_time),
            //     end_time: new Date(event.end_time),
            // }));
            useLinkUpStore.setState({ eventArray: data });
            return data;
        },
        refetchOnWindowFocus: false,
        enabled: false,
    });
    useEffect(() => {
        if (!selectedArtist) {
            return;
        }
        refetch();
    }, [selectedArtist]);

    return { isPending, error };
};

export const useAgentArtistModal = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const artistId = selectedArtist?.id ?? -1;
    const { isPending, error } = useQuery({
        queryKey: [`/api/companies/artists/`, artistId],
        queryFn: async () => {
            if (artistId === -1) {
                return null;
            }
            const selectedArtist = useLinkUpStore.getState().selectedArtist;
            const data = await axiosReturnsData(
                "GET",
                `/api/companies/artists/${selectedArtist?.id ?? -1}`,
            );
            useLinkUpStore.setState({ selectedArtist: data });
            return data;
        },
    });

    return { isPending, error };
};
