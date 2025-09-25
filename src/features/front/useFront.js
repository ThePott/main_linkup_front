import useLinkUpStore from "../../shared/store/store";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import queryClient from "../../shared/services/queryClient";

const useAuthMe = () => {
    const navigate = useNavigate();
    const access_token = useLinkUpStore((state) => state.access_token);
    const setUser = useLinkUpStore((state) => state.setUser);

    const endpointAuthMe = "/api/auth/me";
    const {
        data,
        error: errorAuthMe,
        isPending: isPendingAuthMe,
    } = useQuery({
        queryKey: [endpointAuthMe, access_token],
        queryFn: () => axiosReturnsData("GET", endpointAuthMe),
        refetchOnWindowFocus: false,
        enabled: Boolean(access_token),
    });

    useEffect(() => {
        setUser(data ?? null);

        if (!data) {
            return;
        }
        const user_type = data.user_type;
        switch (user_type) {
            case "fan":
                break;
            case "company":
                navigate("/agency");
                break;
            case "admin":
                navigate("/super-user");
                break;
            default:
                throw new Error("---- ERROR OCCURRED: 잘못된 유저 타입:", user_type);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { isPendingAuthMe, errorAuthMe };
};

const useSubscriptions = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const access_token = useLinkUpStore((state) => state.access_token);

    const endpoint = "/api/subscriptions";
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
        setArtistArray(data ?? []);
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
    const authMeReturn = useAuthMe();
    const subscriptionsReturn = useSubscriptions();

    return { ...authMeReturn, ...subscriptionsReturn };
};
