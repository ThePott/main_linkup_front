import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosReturnsData } from "../../../package/commonServices/axiosVariants";
import useLinkUpStore from "../../../shared/store/store";
import { useEffect } from "react";

const useAgentArtistModalQuery = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const setSelectedArtist = useLinkUpStore(
        (state) => state.setSelectedArtist,
    );

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
    const addArtistInTemp = useLinkUpStore((state) => state.addArtistInTemp);
    const addArtistInReal = useLinkUpStore((state) => state.addArtistInReal);
    const updateArtistInTemp = useLinkUpStore(
        (state) => state.updateArtistInTemp,
    );
    const deleteArtist = useLinkUpStore((state) => state.deleteArtist);

    const postMutation = useMutation({
        mutationFn: (formData) =>
            axiosReturnsData(
                "POST",
                "/api/companies/artists/with-images",
                formData,
            ),
        onMutate: (formData) => {
            addArtistInTemp(formData);
        },
        onSuccess: (data) => addArtistInReal(data),
    });
    const putMutation = useMutation({
        mutationFn: async ({ body, id }) =>
            axiosReturnsData(
                "PUT",
                `/api/companies/artists/with-images/${id}`,
                body,
            ),
        onMutate: ({ id, body }) => {
            updateArtistInTemp(id, body);
        },
    });
    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return axiosReturnsData("DELETE", `/api/companies/artists/${id}`);
        },
        onMutate: (id) => deleteArtist(id),
    });

    return { postMutation, putMutation, deleteMutation };
};

const useAgentArtistModal = () => {
    const queryReturn = useAgentArtistModalQuery();
    const mutateReturn = useAgentArtistModalMutate();

    return { ...queryReturn, ...mutateReturn };
};

export default useAgentArtistModal;
