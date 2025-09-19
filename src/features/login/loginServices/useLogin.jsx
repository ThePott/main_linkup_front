import { useEffect, useState } from "react";
import { login } from "./loginApi";
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
        debugger;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return { setBody, error, isLoading };
};
