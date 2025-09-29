import useLinkUpStore from "../../shared/store/store";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAuth from "../../shared/services/useAuth";
import useSubscriptions from "../../shared/services/useSubscriptions";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export const useFront = () => {
    useParseTokenFromRedirectedUrl();
    const authReturn = useAuth();
    const subscriptionsReturn = useSubscriptions();

    return { ...authReturn, ...subscriptionsReturn };
};
