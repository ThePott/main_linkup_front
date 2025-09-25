import { useCallback } from "react";
import queryClient from "../../shared/services/queryClient";
import useLinkUpStore from "../../shared/store/store";

const useLogoutAndClearCache = () => {
    const access_token = useLinkUpStore((state) => state.access_token);
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);
    const setUser = useLinkUpStore((state) => state.setUser);
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);

    const logout = useCallback(() => {
        if (!access_token) {
            return;
        }
        queryClient.removeQueries({ queryKey: ["/api/auth/me", access_token] }); // Removes all variants
        queryClient.removeQueries({ queryKey: ["/api/subscriptions", access_token] }); // Removes all variants

        setAccessToken(null);
        setUser(null);
        setArtistArray([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [access_token]);

    return { logout };
};
const useNavbar = () => {
    const { logout } = useLogoutAndClearCache();

    return { logout };
};

export default useNavbar;
