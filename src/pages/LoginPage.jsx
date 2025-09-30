import styles from "./LoginPage.module.css";
import { Link } from "react-router";
import SocialLoginButton from "../features/login/loginComponents/SocialLoginButton";
import CustomButton from "../package/customButton/CustomButton";
import { FullScreen, Hstack, Vstack } from "../package/layout";
import RoundBox from "../package/RoundBox";
import useAuth from "../shared/services/useAuth";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import LabelGroup from "../package/labelGroup/LabelGroup";
import CustomInput from "../package/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../shared/validations/zodSchema";

const LoginPage = () => {
    const { errorLogin, isPendingLogin, postLoginMutation } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    useEffect(() => {
        setError("password", {
            type: "server",
            message: "이메일 또는 비밀번호가 잘못되었습니다",
        });
        console.error();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorLogin]);

    const onSubmit = (data) => {
        postLoginMutation.mutate(data);
    };

    return (
        <FullScreen center>
            <RoundBox padding="LG">
                <Vstack gap="xl">
                    <Vstack style={{ width: "400px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Vstack gap="xl">
                                <LabelGroup isRed={errors.email}>
                                    <LabelGroup.BigLabel>이메일</LabelGroup.BigLabel>
                                    <CustomInput {...register("email")} />
                                    {errors.email && (
                                        <LabelGroup.SmallLabel>
                                            {errors.email.message}
                                        </LabelGroup.SmallLabel>
                                    )}
                                </LabelGroup>
                                <LabelGroup isRed={errors.password}>
                                    <LabelGroup.BigLabel>비밀번호</LabelGroup.BigLabel>
                                    <CustomInput {...register("password")} />
                                    {errors.password && (
                                        <LabelGroup.SmallLabel>
                                            {errors.password.message}
                                        </LabelGroup.SmallLabel>
                                    )}
                                </LabelGroup>
                                <CustomButton disabled={isPendingLogin}>
                                    이메일로 로그인
                                </CustomButton>
                            </Vstack>
                        </form>
                    </Vstack>

                    <Vstack>
                        {/* <SocialLoginButton provider={"GOOGLE"} /> */}
                        <SocialLoginButton disabled={isPendingLogin} provider={"KAKAO"} />
                        {/* <SocialLoginButton provider={"FACEBOOK"} /> */}
                    </Vstack>

                    <Hstack>
                        <p className={styles.smallSubText}>계정이 필요한가요?</p>
                        <Link to="/signup" className={styles.smallLink}>
                            가입하기
                        </Link>
                    </Hstack>
                </Vstack>
            </RoundBox>
        </FullScreen>
    );
};

export default LoginPage;
