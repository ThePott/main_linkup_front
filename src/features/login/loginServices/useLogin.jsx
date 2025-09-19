import { useEffect, useState } from "react";
import { login } from "./loginApi";
import { useQuery } from "@tanstack/react-query";
import useLinkUpStore from "../../../shared/store/dummyMijin";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const [body, setBody] = useState(null);
    const setToken = useLinkUpStore((state) => state.setToken);
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
        setToken(data);
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
