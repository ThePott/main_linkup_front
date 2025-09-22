import { useEffect, useState } from "react";
import { login, socialLogin } from "./loginApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useLinkUpStore from "../../../shared/store/store";

export const useLogin = () => {
    const [body, setBody] = useState(null);
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);
    const navigate = useNavigate();

    // data: token
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["login"],
        queryFn: () => login(body),
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
        setAccessToken(data);
        navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (!error) {
            return;
        }
        console.error(error);
    }, [error]);

    return { setBody, error, isLoading };
};

export const useSocialLogin = (provider) => {
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);
    const lowerCasedProvider = provider.toLowerCase();
    // data: access_token
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["socialLogin", lowerCasedProvider],
        queryFn: () => socialLogin(lowerCasedProvider),
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
