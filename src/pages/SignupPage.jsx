import styles from "./SignupPage.module.css";
import { useEffect, useState } from "react";
import RoundBox from "../package/RoundBox";
import { Hstack, Vstack } from "../package/layout";
import CustomButton from "../package/customButton/CustomButton";
import useSignup from "../features/signup/useSignup";
import LabelGroup from "../package/labelGroup/LabelGroup";
import CustomInput from "../package/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../shared/validations/zodSchema";
import Container from "../package/layout/_Container";
import GridContainer from "../package/gridContainer/GridContainer";
import useLinkUpStore from "../shared/store/store";
import ErrorModal from "../package/modal/ErrorModal";

const SignupPage = () => {
    const [isForAgency, setIsForAgency] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const [email, setEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(signupSchema) });

    const {
        sendVerificationEmailMutation,
        signupMutation,

        isPendingVerification,
        errorVerification,
        isPendingSignup,
        errorSignup,

        isOkayToShow,
    } = useSignup();

    const onSubmit = (data) => {
        const body = { ...data, user_type: isForAgency ? "company" : "fan" };
        signupMutation.mutate(body);
    };

    const handleVerificationClick = () => {
        sendVerificationEmailMutation.mutate({ email });
        setIsVerificationCodeSent(true);
    };

    const passwordLabel =
        isPasswordFocused || errors.password
            ? "비밀번호 - 8자 이상, 대소문자, 특수문자 필수"
            : "비밀번호";

    const verificationCodeLabel = isVerificationCodeSent
        ? "인증 코드 - 이메일을 확인하세요"
        : "인증 코드";

    if (!isOkayToShow) {
        return null;
    }

    return (
        <>
            <ErrorModal error={errorVerification || errorSignup} isRedirectingWithUnknownError />
            <Container marginTop="none" className={styles.outerContainer}>
                <RoundBox padding="lg" className={styles.innerContainer}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Vstack gap="lg">
                            <GridContainer cols={2} gap="sm">
                                <CustomButton
                                    isOn={!isForAgency}
                                    className={styles.grow}
                                    onClick={() => setIsForAgency(false)}
                                    type="button"
                                >
                                    팬
                                </CustomButton>
                                <CustomButton
                                    isOn={isForAgency}
                                    className={styles.grow}
                                    onClick={() => setIsForAgency(true)}
                                    type="button"
                                >
                                    소속사
                                </CustomButton>
                            </GridContainer>

                            <Hstack items="end" gap="sm">
                                <div className="grow">
                                    <LabelGroup isRed={errors.email}>
                                        <LabelGroup.BigLabel>이메일</LabelGroup.BigLabel>
                                        <CustomInput
                                            {...register("email")}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                        {errors.email && (
                                            <LabelGroup.SmallLabel>
                                                {errors.email.message}
                                            </LabelGroup.SmallLabel>
                                        )}
                                    </LabelGroup>
                                </div>
                                <CustomButton
                                    type="button"
                                    className={styles.certificateButton}
                                    disabled={isPendingVerification}
                                    onClick={handleVerificationClick}
                                >
                                    이메일 인증
                                </CustomButton>
                            </Hstack>
                            <LabelGroup isRed={errors.verification_code}>
                                <LabelGroup.BigLabel>{verificationCodeLabel}</LabelGroup.BigLabel>
                                <CustomInput {...register("verification_code")} />
                                {errors.verification_code && (
                                    <LabelGroup.SmallLabel>
                                        {errors.verification_code.message}
                                    </LabelGroup.SmallLabel>
                                )}
                            </LabelGroup>
                            <LabelGroup isRed={errors.password}>
                                <LabelGroup.BigLabel>{passwordLabel}</LabelGroup.BigLabel>
                                <CustomInput
                                    {...register("password")}
                                    type="password"
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                {errors.password && (
                                    <LabelGroup.SmallLabel>
                                        {errors.password.message}
                                    </LabelGroup.SmallLabel>
                                )}
                            </LabelGroup>
                            <LabelGroup isRed={errors.passwordConfirm}>
                                <LabelGroup.BigLabel>비밀번호 확인</LabelGroup.BigLabel>
                                <CustomInput {...register("passwordConfirm")} type="password" />
                                {errors.passwordConfirm && (
                                    <LabelGroup.SmallLabel>
                                        {errors.passwordConfirm.message}
                                    </LabelGroup.SmallLabel>
                                )}
                            </LabelGroup>
                            <LabelGroup isRed={errors.nickname}>
                                <LabelGroup.BigLabel>닉네임</LabelGroup.BigLabel>
                                <CustomInput {...register("nickname")} />
                                {errors.nickname && (
                                    <LabelGroup.SmallLabel>
                                        {errors.nickname.message}
                                    </LabelGroup.SmallLabel>
                                )}
                            </LabelGroup>
                            <CustomButton disabled={isPendingSignup}>회원가입</CustomButton>
                        </Vstack>
                    </form>
                </RoundBox>
            </Container>
        </>
    );
};

export default SignupPage;
