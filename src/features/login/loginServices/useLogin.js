import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useLinkUpStore from "../../../shared/store/store";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";

export const useLogin = () => {
    const [body, setBody] = useState(null);
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);
    const navigate = useNavigate();

    const endpoint = "/api/auth/login";
    // data: token
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("POST", endpoint, body),
        refetchOnWindowFocus: false,
        enabled: false,
    });

    useEffect(() => {
        if (!body) {
            return;
        }

        refetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [body]);

    useEffect(() => {
        if (!data) {
            return;
        }
        if (!data.access_token) {
            throw new Error("---- ERROR OCCURRED: 로그인은 성공했는데 토큰이 안 옴");
        }
        setAccessToken(data.access_token);
        navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { setBody, error, isLoading };
};

export const useSocialLogin = (provider) => {
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);
    const lowerCasedProvider = provider.toLowerCase();

    const endpoint = `/api/auth/${lowerCasedProvider}/login`;
    // data: access_token
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
        refetchOnWindowFocus: false,
        enabled: false,
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setAccessToken(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { isLoading, error, refetch };
};
