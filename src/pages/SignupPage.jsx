import styles from "./SignupPage.module.css";
import { useState } from "react";
import RoundBox from "../package/RoundBox";
import { FullScreen, Hstack, Vstack } from "../package/layout";
import CustomButton from "../package/customButton/CustomButton";
import CustomInputLabeled from "../package/CustomInputLabeled";
import { useSignup } from "../features/signup/useSignup";
import {
    inputPropsDict,
    inputPropsEntryArray,
} from "../features/signup/signupInputProps";
import {
    checkAdditionalEmailValidity,
    checkAdditionalPasswordValidity,
} from "../features/signup/signupCheckValidity";

const SignupPage = () => {
    const [isForAgency, setIsForAgency] = useState(false);

    const {
        verifiedEmail,
        setVerifiedEmail,
        emailRef,
        refetchVerification,
        setBody,
        refetchSignup,
    } = useSignup();

    const handleVerificationClick = () => {
        if (!emailRef.current) {
            return;
        }

        if (!emailRef.current.checkValidity()) {
            emailRef.current.reportValidity(); // Shows validation popup
            return;
        }

        refetchVerification();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            email,
            verification_code,
            password,
            passwordConfirm,
            phone_number,
            nickname,
        } = event.target;

        const isEmailValid = checkAdditionalEmailValidity(
            verifiedEmail,
            email,
            setVerifiedEmail,
        );
        if (!isEmailValid) {
            return;
        }

        const tempBody = {
            email: email.value,
            password: password.value,
            phone_number: phone_number.value,
            nickname: nickname.value,
            user_type: "fan",
            verification_code: verification_code.value,
        };

        const isPasswordValid = checkAdditionalPasswordValidity(
            password,
            passwordConfirm,
        );
        if (!isPasswordValid) {
            return;
        }

        setBody(tempBody);
    };

    const verifyEmailButtonLabel = verifiedEmail ? "인증 완료" : "이메일 인증";

    return (
        <FullScreen center>
            <RoundBox padding="LG">
                <Vstack center>
                    <Hstack gap="none">
                        <CustomButton
                            isOn={!isForAgency}
                            className={styles.grow}
                            onClick={() => setIsForAgency(false)}
                        >
                            팬
                        </CustomButton>
                        <CustomButton
                            isOn={isForAgency}
                            className={styles.grow}
                            onClick={() => setIsForAgency(true)}
                        >
                            소속사
                        </CustomButton>
                    </Hstack>

                    <form onSubmit={handleSubmit}>
                        <Vstack style={{ width: "400px" }}>
                            <Hstack style={{ width: "100%" }} items="end">
                                <CustomInputLabeled
                                    label="이메일"
                                    vstackProps={{ className: styles.grow }}
                                    inputProps={{
                                        ref: emailRef,
                                        ...inputPropsDict["이메일"],
                                    }}
                                />
                                <CustomButton
                                    type="button"
                                    onClick={handleVerificationClick}
                                >
                                    {verifyEmailButtonLabel}
                                </CustomButton>
                            </Hstack>
                            {inputPropsEntryArray.slice(1).map((entry) => (
                                <CustomInputLabeled
                                    key={entry[0]}
                                    label={entry[0]}
                                    inputProps={entry[1]}
                                />
                            ))}
                            <CustomButton>회원가입</CustomButton>
                        </Vstack>
                    </form>
                </Vstack>
            </RoundBox>
        </FullScreen>
    );
};

export default SignupPage;
