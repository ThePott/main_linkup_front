import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import { useNavigate } from "react-router";

export const useSignup = () => {
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

    return {
        sendVerificationEmailMutation,
        signupMutation,

        isPendingVerification: sendVerificationEmailMutation.isPending,
        errorVerification: sendVerificationEmailMutation.error,
        isPendingSignup: signupMutation.isPending,
        errorSignup: signupMutation.error,
    };
};
