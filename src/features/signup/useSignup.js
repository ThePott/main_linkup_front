import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import { useNavigate } from "react-router";
import useLinkUpStore from "../../shared/store/store";
import { useEffect } from "react";

const useSignupMutate = () => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const navigate = useNavigate();

    const sendVerificationEmailMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", "/api/auth/send-verification-email", body),
    });

    const signupMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", "/api/auth/signup", body),
        onSuccess: () => {
            navigate("/login", { replace: true });
        },
    });

    useEffect(() => {
        if (!sendVerificationEmailMutation.error && !signupMutation.error) {
            return;
        }

        setModalKey("error");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendVerificationEmailMutation.error, signupMutation.error]);

    return {
        sendVerificationEmailMutation,
        signupMutation,

        isPendingVerification: sendVerificationEmailMutation.isPending,
        errorVerification: sendVerificationEmailMutation.error,
        isPendingSignup: signupMutation.isPending,
        errorSignup: signupMutation.error,
    };
};

const useSignupRedirect = () => {
    const user = useLinkUpStore((state) => state.user);

    const navigate = useNavigate();

    const isOkayToShow = !user;

    useEffect(() => {
        if (!user) {
            return;
        }
        navigate("/", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return { isOkayToShow };
};

const useSignup = () => {
    const mutateReturns = useSignupMutate();
    const redirectReturns = useSignupRedirect();

    return { ...mutateReturns, ...redirectReturns };
};

export default useSignup;
