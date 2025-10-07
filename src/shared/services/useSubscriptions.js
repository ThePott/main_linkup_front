import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosReturnsData } from "./axiosInstance";
import { useEffect } from "react";
import useLinkUpStore from "../store/store";
import queryClient from "./queryClient";

const queryEndpoint = "/api/subscriptions?include_image=true";
const mutateEndpoint = "/api/subscriptions";

const useSubscriptionsQuery = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const user = useLinkUpStore((state) => state.user);
    const {
        data,
        isPending: isPendingSubscriptions,
        error: errorSubscriptions,
    } = useQuery({
        queryKey: [queryEndpoint],
        queryFn: () => axiosReturnsData("GET", queryEndpoint),
        enabled: user?.user_type === "fan",
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setArtistArray(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return { isPendingSubscriptions, errorSubscriptions };
};

const useSubscriptionsMutate = () => {
    /** 사용법
     * const { postMutation } = useSubscriptions()
     * ...
     * // body = {artist_id: 1}
     * // newOne = {artist_id:1, group_name: "에스파", stage_name: "카리나"}
     * ...
     * <button onClick={ () => postMutation.mutate({ body, newOne })}>구독하기</button>
     */
    const postMutation = useMutation({
        mutationFn: ({ body }) => axiosReturnsData("POST", mutateEndpoint, body),
        onMutate: async ({ newOne }) => {
            await queryClient.cancelQueries({
                queryKey: [queryEndpoint],
            });
            const previous = queryClient.getQueryData([queryEndpoint]);
            const newArray = [...previous, newOne];
            queryClient.setQueryData([queryEndpoint], newArray);
            return { previous };
        },
        onError: async (error, _data, context) => {
            console.error(error);
            queryClient.setQueryData([queryEndpoint], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [queryEndpoint],
            });
        },
    });

    /** 사용법
     * const { deleteMutation } = useSubscriptions()
     * ...
     * <button onClick={ () => deleteMutation.mutate(artist_id)}>구독 취소하기</button>
     */
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosReturnsData("DELETE", `${mutateEndpoint}/${id}`),
        onMutate: async (id) => {
            await queryClient.cancelQueries({
                queryKey: [queryEndpoint],
            });

            const previous = queryClient.getQueryData([queryEndpoint]);
            const newArray = previous.filter((el) => el.id !== id);
            queryClient.setQueryData([queryEndpoint], newArray);

            return { previous };
        },
        onError: async (error, _data, context) => {
            console.error(error);
            queryClient.setQueryData([queryEndpoint], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [queryEndpoint],
            });
        },
    });
    return { postMutation, deleteMutation };
};

const useSubscriptions = () => {
    const queryReturn = useSubscriptionsQuery();
    const mutateReturn = useSubscriptionsMutate();

    return { ...queryReturn, ...mutateReturn };
};

export default useSubscriptions;
