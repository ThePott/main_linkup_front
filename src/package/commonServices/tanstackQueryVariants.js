// 관련 문서: TanStack Query - Optimistic Updates
// https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates

import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import queryClient from "../../shared/services/queryClient";

/**
 * @param {"POST" | "PUT" | "DELETE"} method
 * @param {string} mutationEndpoint - POST 엔드포인트
 * @param {string} queryEndpoint - 관련 자료 GET 할 때 쓴 엔드포인트
 * @param {any} body - POST 요청에 넣을 body
 * @param {(previous: any, newOne: any) => any} updateCacheForUi
 */
export const useSimpleMutation = (method, queryEndpoint, mutateEndpoint, updateCacheForUi) => {
    const simpleMutation = useMutation({
        mutationFn: ({ body }) => axiosReturnsData(method, mutateEndpoint, body),
        onMutate: async ({ newOne }) => {
            await queryClient.cancelQueries({
                queryKey: [queryEndpoint],
            });

            const previous = queryClient.getQueryData([queryEndpoint]);
            const newCache = updateCacheForUi(previous, newOne);
            queryClient.setQueryData([queryEndpoint], newCache);

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

    return simpleMutation;
};
