import useLinkUpStore from "../../shared/store/store";
import { apiAuthMe } from "../../shared/services/linkupApi";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

const useGetMe = () => {
    const access_token = useLinkUpStore((state) => state.access_token);
    const setUser = useLinkUpStore((state) => state.setUser);
    const user = useLinkUpStore((state) => state.user);

    // data: user
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["getApiAuthMe"],
        queryFn: () => apiAuthMe("GET"),
        refetchOnWindowFocus: false,
        enabled: false,
    });
    useEffect(() => {
        if (!access_token) {
            return;
        }
        refetch();
    }, []);
    useEffect(() => {
        if (!data) {
            return;
        }
        setUser(data);
    }, [data]);
    useEffect(() => {
        if (!user) {
            return;
        }
        console.log({ user });
    }, [user]);
};

const useParseTokenFromRedirectedUrl = () => {
    const [searchParams, _setSearchParams] = useSearchParams();
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);

    useEffect(() => {
        const access_token = searchParams.get("access_token");
        if (!access_token) {
            return;
        }
        console.log({ access_token });
        setAccessToken(access_token);
    }, []);
};

export const useFront = () => {
    useGetMe();
    useParseTokenFromRedirectedUrl();
};
