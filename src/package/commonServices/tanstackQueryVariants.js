// 관련 문서: TanStack Query - Optimistic Updates
// https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates

import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import queryClient from "../../shared/services/queryClient";

/**
 * @param {string} mutationEndpoint - POST 엔드포인트
 * @param {string} queryEndpoint - 관련 자료 GET 할 때 쓴 엔드포인트
 * @param {(formData: FormData) => object} conversionFn - 폼 데이터를 객체로 알맞게 변환하는 함수
 *
 * <button onClick={() => postMutation.mutate(body)}>추가 버튼</button>
 */
export const usePostMutation = (
    mutationEndpoint,
    queryEndpoint,
    conversionFn,
) => {
    const postMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", mutationEndpoint, body),
        onMutate: async (body) => {
            await queryClient.cancelQueries({
                queryKey: [queryEndpoint],
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
    return postMutation;
};

/**
 * @param {string} mutationEndpoint - POST 엔드포인트
 * @param {string} queryEndpoint - 관련 자료 GET 할 때 쓴 엔드포인트
 * @param {(formData: FormData) => object} conversionFn - 폼 데이터를 객체로 알맞게 변환하는 함수
 *
 * <button onClick={() => putMutation.mutate(body)}>수정 버튼</button>
 * 주의할 점: 불필요하더라도 body에 id를 넣어주셔야 합니다. 그래야 UI 상에서 알맞는 객체가 업데이트가 됩니다.
 *
 */
export const usePutMutation = (
    mutationEndpoint,
    queryEndpoint,
    conversionFn,
) => {
    const putMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("PUT", mutationEndpoint, body),
        onMutate: async (body) => {
            await queryClient.cancelQueries({
                queryKey: [queryEndpoint],
            });

            const previous = queryClient.getQueryData([queryEndpoint]);
            const newOne = conversionFn ? conversionFn(body) : newOne;
            const newArray = previous.map((el) =>
                el.id === newOne.id ? newOne : el,
            );
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
    return putMutation;
};

/**
 * @param {string} mutationEndpoint - POST 엔드포인트
 * @param {string} queryEndpoint - 관련 자료 GET 할 때 쓴 엔드포인트
 * @param {(formData: FormData) => object} conversionFn - 폼 데이터를 객체로 알맞게 변환하는 함수
 *
 * <button onClick={()=>deleteMutation.mutate(삭제할 것의 id)}>삭제 버튼</button>
 * 주의할 점: 삭제할 땐 body가 없는 것과 무관히 꼭 mutate 안에 id를 넣으셔야 합니다.
 */
export const useDeleteMutation = (mutationEndpoint, queryEndpoint) => {
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosReturnsData("DELETE", mutationEndpoint),
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
    return deleteMutation;
};
