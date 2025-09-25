import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useLinkUpStore from "../../../shared/store/store";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";

export const useLogin = () => {
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const postMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", "/api/auth/login", body),
        onMutate: () => {
            setIsPending(true);
            setError(null);
        },
        onSuccess: (data) => {
            setAccessToken(data.access_token);
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
            setError(error);
        },
        onSettled: () => setIsPending(false),
    });

    return { isPending, error, postMutation };
};
