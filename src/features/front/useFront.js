import useLinkUpStore from "../../shared/store/store";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import queryClient from "../../shared/services/queryClient";
import useAuth from "../../shared/services/useAuth";

const useSubscriptions = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const access_token = useLinkUpStore((state) => state.access_token);

    const endpoint = "/api/subscriptions?include_image=true";
    const {
        data,
        error: errorSubscriptions,
        isPending: isPendingSubscriptions,
    } = useQuery({
        queryKey: [endpoint, access_token],
        queryFn: () => axiosReturnsData("GET", endpoint),
        refetchOnWindowFocus: false,
        enabled: Boolean(access_token),
    });
    useEffect(() => {
        if (!data) {
            return;
        }
        setArtistArray(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { errorSubscriptions, isPendingSubscriptions };
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

const useClearCacheAfterLogout = () => {
    const access_token = useLinkUpStore((state) => state.access_token);
    // TODO: 이게 작동하게 하려면 로그아웃하면 무조건 프론트 페이지로 오게 해야 한다
    useEffect(() => {
        if (!access_token) {
            queryClient.setQueryData(["/api/auth/me"], null);
            queryClient.setQueryData(["/api/subscriptions"], []);
            // queryClient.setQueryData(["/api/auth/me"], null);
            // queryClient.setQueryData(["/api/subscriptions"], []);
        }
    }, [access_token]);
};

export const useFront = () => {
    useClearCacheAfterLogout();
    useParseTokenFromRedirectedUrl();
    const authReturn = useAuth();
    const subscriptionsReturn = useSubscriptions();

    return { ...authReturn, ...subscriptionsReturn };
};
