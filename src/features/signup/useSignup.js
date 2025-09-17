import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../shared/services/axiosInstance";

const sendVerificationEmail = async (emailRef) => {
    const email = emailRef.current.value;
    const { message, email: verifiedEmail } = await axiosInstance.post(
        "/api/auth/send-verification-email",
        {
            email,
        },
    );
    console.log({ message });
    return verifiedEmail;
};

const useRequestVerifyEmail = () => {
    const [verifiedEmail, setVerifiedEmail] = useState(null);
    const emailRef = useRef(null);

    const {
        data: verificationData,
        error: verificationError,
        refetch: refetchVerification,
    } = useQuery({
        queryKey: ["sendVerificationEmail"],
        queryFn: () => sendVerificationEmail(emailRef),
        refetchOnWindowFocus: false,
        enabled: false,
    });

    useEffect(() => {
        if (verificationError) {
            console.error(verificationError);
            setVerifiedEmail(null);
            return;
        }

        if (!verificationData) {
            return;
        }

        setVerifiedEmail(verificationData);
    }, [verificationData, verificationError]);

    return { verifiedEmail, setVerifiedEmail, emailRef, refetchVerification };
};

const signup = (body) => axiosInstance.post("/api/auth/signup", body);

const useRequestSignup = (verifiedEmail) => {
    const [body, setBody] = useState(null);
    const {
        data: signupData,
        error: signupError,
        refetch: refetchSignup,
    } = useQuery({
        queryKey: ["signup"],
        queryFn: () => signup(body),
        refetchOnWindowFocus: false,
        enabled: false,
    });

    useEffect(() => {
        if (signupError) {
            console.error(signupError);
            return;
        }

        if (!verifiedEmail) {
            return;
        }

        // TODO: handle signup success
        console.log({ signupData });
        debugger;
    }, [signupData, signupError]);

    return { setBody, refetchSignup };
};

export const useSignup = () => {
    const veryfiyEmailReturn = useRequestVerifyEmail();
    const signupReturn = useRequestSignup(veryfiyEmailReturn.verifiedEmail);

    return { ...veryfiyEmailReturn, ...signupReturn };
};
