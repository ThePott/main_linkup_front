import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";

export const useBulkMutation = (url) => {
    const postMutation = useMutation({
        mutationFn: (body) => {
            return axiosReturnsData("POST", url, body);
        },
    });
    const putMutation = useMutation({
        mutationFn: (body) => {
            return axiosReturnsData("PUT", url, body);
        },
    });
    const deleteMutation = useMutation({
        mutationFn: (body) => {
            return axiosReturnsData("DELETE", url, body);
        },
    });

    return {
        postMutation,
        putMutation,
        deleteMutation,
    };
};
