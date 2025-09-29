import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosReturnsData } from "./axiosInstance";
import { useEffect } from "react";
import useLinkUpStore from "../store/store";
import queryClient from "./queryClient";

const useSubscriptionsQuery = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const user = useLinkUpStore((state) => state.user);
    const endpoint = "/api/subscriptions?include_image=true";
    const {
        data,
        isPending: isPendingSubscriptions,
        error: errorSubscriptions,
    } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
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
    const endpoint = "/api/subscriptions";

    /** 사용법
     * const { postMutation } = useSubscriptions()
     * ...
     * // body = {artist_id: 1}
     * // newOne = {artist_id:1, group_name: "에스파", stage_name: "카리나"}
     * ...
     * <button onClick={ () => postMutation.mutate({ body, newOne })}>구독하기</button>
     */
    const postMutation = useMutation({
        mutationFn: ({ body }) => axiosReturnsData("POST", endpoint, body),
        onMutate: async ({ newOne }) => {
            await queryClient.cancelQueries({
                queryKey: [endpoint],
            });
            const previous = queryClient.getQueryData([endpoint]);
            // TODO: subscribedAt이 기록되어서 이걸로 sorting이 되면 좋겠더
            // const newArray = [...previous, newOne].sort((a, b) => a.id - b.id);
            const newArray = [...previous, newOne];
            queryClient.setQueryData([endpoint], newArray);
            return { previous };
        },
        onError: async (error, _data, context) => {
            console.error(error);
            queryClient.setQueryData([endpoint], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [endpoint],
            });
        },
    });

    /** 사용법
     * const { deleteMutation } = useSubscriptions()
     * ...
     * <button onClick={ () => deleteMutation.mutate(artist_id)}>구독 취소하기</button>
     */
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosReturnsData("DELETE", `${endpoint}/${id}`),
        onMutate: async (id) => {
            await queryClient.cancelQueries({
                queryKey: [endpoint],
            });

            const previous = queryClient.getQueryData([endpoint]);
            const newArray = previous.filter((el) => el.id !== id);
            queryClient.setQueryData([endpoint], newArray);

            return { previous };
        },
        onError: async (error, _data, context) => {
            console.error(error);
            queryClient.setQueryData([endpoint], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [endpoint],
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
