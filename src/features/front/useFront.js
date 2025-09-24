import useLinkUpStore from "../../shared/store/store";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { axiosReturnsData } from "../../shared/services/axiosInstance";

const useGetMe = () => {
    const navigate = useNavigate();
    const access_token = useLinkUpStore((state) => state.access_token);
    const setUser = useLinkUpStore((state) => state.setUser);
    const user = useLinkUpStore((state) => state.user);

    const endpoint = "/api/auth/me";
    // data: user
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
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
        const user_type = user.user_type;
        switch (user_type) {
            case "fan":
                break;
            case "company":
                navigate("/agency");
                break;
            case "super_user":
                navigate("/super-user");
                break;
            default:
                throw new Error("---- ERROR OCCURRED: 잘못된 유저 타입:", user_type);
        }
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
