import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";

export const useSignup = () => {
    const sendVerificationEmailMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", "/api/auth/send-verification-email", body),
    });

    const signupMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", "/api/auth/signup", body),
    });

    return {
        sendVerificationEmailMutation,
        signupMutation,
    };
};
