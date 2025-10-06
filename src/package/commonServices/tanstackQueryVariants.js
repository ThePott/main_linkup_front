// 관련 문서: TanStack Query - Optimistic Updates
// https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates

import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import queryClient from "../../shared/services/queryClient";

/**
 * @param {object} options
 * @param {"POST" | "PUT" | "DELETE"} options.method
 * @param {string} options.mutationEndpoint - POST 엔드포인트
 * @param {string} options.queryEndpoint - 관련 자료 GET 할 때 쓴 엔드포인트
 * @param {(previous: any, newOne: any) => any} options.updateCacheForUi
 * @param {() => any} options.handleSuccess
 * @param {(error) => any} optoins.handleError
 */
export const useSimpleMutation = (options) => {
    const { method, queryEndpoint, mutateEndpoint, updateCacheForUi, handleSuccess, handleError } =
        options;
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
        onSuccess: () => {
            if (handleSuccess) {
                handleSuccess();
            }
        },
        onError: async (error, _data, context) => {
            console.error(error);
            queryClient.setQueryData([queryEndpoint], context.previous);
            if (handleError) {
                handleError(error);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [queryEndpoint],
            });
        },
    });

    return simpleMutation;
};
