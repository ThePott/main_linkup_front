import { useQuery } from "@tanstack/react-query";
import useLinkUpStore from "../../../shared/store/store";
import { useEffect } from "react";
import { convertFormDataToArtist } from "../agencyUtils";
import {
    useDeleteMutation,
    usePostMutation,
    usePutMutation,
} from "../../../package/commonServices/tanstackQueryVariants";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";

const useAgentArtistModalQuery = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const setSelectedArtist = useLinkUpStore((state) => state.setSelectedArtist);

    const artistId = selectedArtist?.id ?? -1;
    const { data, isPending, error } = useQuery({
        queryKey: [`/api/companies/artists/${artistId}`],
        queryFn: async () => {
            if (artistId === -1) {
                return null;
            }
            const data = await axiosReturnsData(
                "GET",
                `/api/companies/artists/${selectedArtist?.id ?? -1}`,
            );
            return data;
        },
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setSelectedArtist(data);
    }, [data]);

    return { isPending, error };
};

const useAgentArtistModalMutate = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const id = selectedArtist?.id ?? -1;

    const postMutation = usePostMutation(
        `/api/companies/artists/with-images`,
        "/api/companies/artists",
        convertFormDataToArtist,
    );
    const putMutation = usePutMutation(
        `/api/companies/artists/with-images/${id}`,
        "/api/companies/artists",
        convertFormDataToArtist,
    );
    const deleteMutation = useDeleteMutation(
        `/api/companies/artists/${id}`,
        "/api/companies/artists",
    );

    return { postMutation, putMutation, deleteMutation };
};

const useAgentArtistModal = () => {
    const queryReturn = useAgentArtistModalQuery();
    const mutateReturn = useAgentArtistModalMutate();

    return { ...queryReturn, ...mutateReturn };
};

export default useAgentArtistModal;
