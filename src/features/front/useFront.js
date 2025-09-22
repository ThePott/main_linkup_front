import useLinkUpStore from "../../shared/store/store";
import { apiAuthMe } from "../../shared/services/linkupApi";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

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

export const useFront = () => {
    useGetMe();
};
