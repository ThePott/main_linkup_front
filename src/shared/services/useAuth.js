import { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiAuthLogin } from "./linkupApi";
import useLinkUpStore from "../store/store";
import { axiosReturnsData } from "./axiosInstance";
import queryClient from "./queryClient";

// const profileMutation = () => {};
// const deleteAccount = () => {};
// const passwordChange = () => {};
// const socialLogin = () => {};
// const emailLogin = () => {};
// const logout = () => {};

const useAuthMeQuery = () => {
    const access_token = useLinkUpStore((state) => state.access_token);
    const setUser = useLinkUpStore((state) => state.setUser);

    const endpoint = "/api/auth/me";

    const {
        data,
        error: errorAuthMe,
        isPending: isPendingAuthMe,
    } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
        enabled: Boolean(access_token),
    });

    useEffect(() => {
        if (!data) {
            return;
        }

        setUser(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { isPendingAuthMe, errorAuthMe };
};

const useAuthLogin = () => {
    const navigate = useNavigate();
    const previousPathname = useLinkUpStore((state) => state.previousPathname);

    const postLoginMutation = useMutation({
        mutationFn: (body) => apiAuthLogin(body),
        onSuccess: (data) => {
            switch (data.user_type) {
                case "fan":
                    navigate(previousPathname ? -1 : "/", { replace: true });
                    break;
                case "company":
                    navigate("/agency", { replace: true });
                    break;
                case "admin":
                    navigate("/super-user", { replace: true });
                    break;
                default:
                    throw new Error("---- ERROR OCCURRED: 잘못된 유저 타입입니다");
            }
        },
    });

    return {
        isPendingLogin: postLoginMutation.isPending,
        errorLogin: postLoginMutation.error,
        postLoginMutation,
    };
};

const useAuthLogout = () => {
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);
    const setUser = useLinkUpStore((state) => state.setUser);
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);

    const logoutMutation = useMutation({
        mutationFn: () => axiosReturnsData("POST", "/api/auth/logout"),
        onMutate: () => {
            queryClient.setQueryData(["/api/auth/me"], null);
            queryClient.setQueryData(["/api/subscriptions"], []);

            setUser(null);
            setArtistArray([]);
        },
        onSettled: () => {
            setAccessToken(null);
        },
    });

    const logout = useCallback(() => {
        logoutMutation.mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { logout };
};

const useAuth = () => {
    const authMeQueryReturn = useAuthMeQuery();
    const authLoginReturn = useAuthLogin();
    const authLogoutReturn = useAuthLogout();

    return { ...authMeQueryReturn, ...authLoginReturn, ...authLogoutReturn };
};

export default useAuth;
