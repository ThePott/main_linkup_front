import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { axiosReturnsData } from "../../../package/commonServices/axiosVariants";
import useLinkUpStore from "../../../shared/store/store";

const useAgencyCalendarQuery = () => {
    const setEventArray = useLinkUpStore((state) => state.setEventArray);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);

    const { data, isPending, error, refetch } = useQuery({
        queryKey: [
            `/api/companies/events?artist_id=${selectedArtist?.id ?? -1}`,
        ],
        queryFn: () =>
            axiosReturnsData(
                "GET",
                `/api/companies/events?artist_id=${selectedArtist?.id ?? -1}`,
            ),
        refetchOnWindowFocus: false,
        enabled: false,
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setEventArray(data);
    }, [data]);

    useEffect(() => {
        if (!selectedArtist) {
            return;
        }
        refetch();
    }, [selectedArtist]);

    return { isPending, error };
};

const useAgencyCalendar = () => {
    const queryReturn = useAgencyCalendarQuery();

    return { ...queryReturn };
};

export default useAgencyCalendar;
