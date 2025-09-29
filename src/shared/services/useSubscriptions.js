import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosReturnsData } from "./axiosInstance";
import { useEffect } from "react";
import useLinkUpStore from "../store/store";
import {
    useDeleteMutation,
    usePostMutation,
} from "../../package/commonServices/tanstackQueryVariants";
import queryClient from "./queryClient";

const useSubscriptionsQuery = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const endpoint = "/api/subscriptions";
    const {
        data,
        isPending: isPendingSubscriptions,
        error: errorSubscriptions,
    } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        debugger;
        setArtistArray(data);
    }, [data]);
    return { isPendingSubscriptions, errorSubscriptions };
};

const useSubscriptionsMutate = () => {
    const endpoint = "/api/subscriptions";
    const postMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", endpoint, body),
        onMutate: async (body) => {
            await queryClient.cancelQueries({
                queryKey: [endpoint],
            });
            const previous = queryClient.getQueryData([queryEndpoint]);
            const newOne = conversionFn ? conversionFn(body) : newOne;
            queryClient.setQueryData([queryEndpoint], [...previous, newOne]);
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
