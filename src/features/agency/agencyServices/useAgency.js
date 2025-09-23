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
            debugger;
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
