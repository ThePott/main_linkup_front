import { useMutation } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useSignup = () => {
    const [isPendingVerification, setIsPendingVerification] = useState(false);
    const [errorVerification, setErrorVerification] = useState(null);
    const [isPendingSignup, setIsPendingSignup] = useState(false);
    const [errorSignup, setErrorSignup] = useState(null);

    const navigate = useNavigate();

    const sendVerificationEmailMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", "/api/auth/send-verification-email", body),
        onMutate: () => {
            setIsPendingVerification(true);
            setErrorVerification(null);
        },
        onError: (error) => {
            debugger;
            setErrorVerification(error);
        },
        onSettled: () => setIsPendingVerification(false),
    });

    const signupMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", "/api/auth/signup", body),
        onMutate: () => {
            setIsPendingSignup(true);
            setErrorSignup(null);
        },
        onError: (error) => {
            debugger;
            setErrorSignup(error);
        },
        onSuccess: () => {
            navigate("/login");
        },
        onSettled: () => setIsPendingSignup(false),
    });

    return {
        sendVerificationEmailMutation,
        signupMutation,

        isPendingVerification,
        errorVerification,
        isPendingSignup,
        errorSignup,
    };
};
