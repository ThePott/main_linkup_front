import { useEffect } from "react";
import useLinkUpStore from "../store/store";
import { useNavigate } from "react-router";

const checkIsOkayToShow = (user_type, user) => {
    switch (user_type) {
        case "fan":
            return user?.user_type === "fan" || user?.user_type === "admin";
        default:
            return user?.user_type === user_type;
    }
};

const useRedirectIfNot = (user_type) => {
    const user = useLinkUpStore((state) => state.user);
    const navigate = useNavigate();

    const isOkayToShow = checkIsOkayToShow(user_type, user);

    useEffect(() => {
        if (isOkayToShow) {
            return;
        }
        navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOkayToShow]);

    return { isOkayToShow };
};

export default useRedirectIfNot;
