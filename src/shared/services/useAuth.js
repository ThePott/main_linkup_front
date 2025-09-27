import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useLinkUpStore from "../../../shared/store/store";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import { apiAuthLogin } from "./linkupApi";

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
        if (data === undefined) {
            return;
        }

        setUser(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { isPendingAuthMe, errorAuthMe };
};

const useAuthLogin = () => {
    const [isPendingLogin, setIsPendingLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(null);
    const navigate = useNavigate();

    const postEmailLoginMutation = useMutation({
        mutationFn: (body) => apiAuthLogin(body),
        onMutate: () => {
            setIsPendingLogin(true);
            setErrorLogin(null);
        },
        onSuccess: (data) => {
            switch (data.user_type) {
                case "fan":
                    navigate("/");
                    break;
                case "company":
                    navigate("/agency");
                    break;
                case "admin":
                    navigate("/super-user");
                    break;
                default:
                    throw new Error("---- ERROR OCCURRED: 잘못된 유저 타입입니다");
            }
        },
        onError: (error) => {
            console.error(error);
            setErrorLogin(error);
        },
        onSettled: () => setIsPendingLogin(false),
    });

    return { isPendingLogin, errorLogin, postEmailLoginMutation };
};

const useAuth = () => {
    const authMeQueryReturn = useAuthMeQuery();
    const authLoginReturn = useAuthLogin();

    return { ...authMeQueryReturn, ...authLoginReturn };
};

export default useAuth;
