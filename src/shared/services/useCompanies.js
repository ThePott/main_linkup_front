import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useLinkUpStore from "../store/store";
import { axiosReturnsData } from "./axiosInstance";
import { useSimpleMutation } from "../../package/commonServices/tanstackQueryVariants";

const useCompaniesArtistsQuery = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const {
        data,
        isPending: isPendingArtists,
        error: errorArtists,
    } = useQuery({
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
        isPendingArtists,
        errorArtists,
    };
};

const useCompaniesArtistsMutate = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const id = selectedArtist?.id ?? -1;

    const baseEndpoint = "/api/companies/artists";
    const artistsPostMutation = useSimpleMutation(
        "POST",
        baseEndpoint,
        baseEndpoint,
        (previous, newOne) => [...previous, newOne],
    );
    const artistsPutMutation = useSimpleMutation(
        "PUT",
        baseEndpoint,
        `${baseEndpoint}/${id}`,
        (previous, newOne) => previous.map((el) => (el.id === newOne.id ? newOne : el)),
    );
    const artistsDeleteMutation = useSimpleMutation(
        "DELETE",
        baseEndpoint,
        `${baseEndpoint}/${id}`,
        (previous, newOne) => previous.filter((el) => el.id !== newOne.id),
    );

    return { artistsPostMutation, artistsPutMutation, artistsDeleteMutation };
};

const useCompaniesEventsQuery = () => {
    const setEventArray = useLinkUpStore((state) => state.setEventArray);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const artistId = selectedArtist?.id ?? -1;
    const endpoint = `/api/companies/events?artist_id=${artistId}`;

    const {
        data,
        isPending: isPendingEvents,
        error: errorEvents,
    } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
        enabled: artistId !== -1,
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setEventArray(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { isPendingEvents, errorEvents };
};

const useCompaniesEventsMutate = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const artistId = selectedArtist?.id ?? -1;
    const queryEndpoint = `/api/companies/events?artist_id=${artistId}`;

    const selectedEvent = useLinkUpStore((state) => state.selectedEvent);
    const eventId = selectedEvent?.id ?? -1;
    const mutateBaseEndpoint = `/api/companies/events`;

    const eventsPostMutation = useSimpleMutation(
        "POST",
        queryEndpoint,
        mutateBaseEndpoint,
        (previous, newOne) => [...previous, newOne],
    );
    const eventsPutMutation = useSimpleMutation(
        "PUT",
        queryEndpoint,
        `${mutateBaseEndpoint}/${eventId}`,
        (previous, newOne) => previous.map((el) => (el.id === newOne.id ? newOne : el)),
    );
    const eventsDeleteMutation = useSimpleMutation(
        "DELETE",
        queryEndpoint,
        `${mutateBaseEndpoint}/${eventId}`,
        (previous, newOne) => previous.filter((el) => el.id !== newOne.id),
    );

    return { eventsPostMutation, eventsPutMutation, eventsDeleteMutation };
};

const useCompanies = () => {
    const artistQueryReturn = useCompaniesArtistsQuery();
    const artistMutateReturn = useCompaniesArtistsMutate();
    const eventsQueryReturn = useCompaniesEventsQuery();
    const eventsMutateReturn = useCompaniesEventsMutate();

    return {
        ...artistQueryReturn,
        ...artistMutateReturn,
        ...eventsQueryReturn,
        ...eventsMutateReturn,
    };
};

export default useCompanies;
