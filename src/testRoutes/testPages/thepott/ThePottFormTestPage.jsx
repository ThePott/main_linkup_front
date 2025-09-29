import { useForm } from "react-hook-form";
import CustomInput from "../../../package/CustomInput";
import CustomButton from "../../../package/customButton/CustomButton";
import LabelGroup from "../../../package/labelGroup/LabelGroup";
import { signupSchema } from "../../../shared/validations/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const TutorialForm = () => {
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(signupSchema) });
    const onSubmit = (data) => {
        console.log({ data });
        if (errors) {
            console.log({ errors });
        }
    };

    const passwordLabel =
        isPasswordFocused || errors.password
            ? "비밀번호 - 8자 이상, 대소문자, 특수문자 필수"
            : "비밀번호";

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <LabelGroup isRed={errors.email}>
                <LabelGroup.BigLabel>이메일</LabelGroup.BigLabel>
                <CustomInput {...register("email")} />
                {errors.email && (
                    <LabelGroup.SmallLabel>{errors.email.message}</LabelGroup.SmallLabel>
                )}
            </LabelGroup>
            <LabelGroup isRed={errors.verification_code}>
                <LabelGroup.BigLabel>인증 번호</LabelGroup.BigLabel>
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
                    <LabelGroup.SmallLabel>{errors.password.message}</LabelGroup.SmallLabel>
                )}
            </LabelGroup>
            <LabelGroup isRed={errors.passwordConfirm}>
                <LabelGroup.BigLabel>비밀번호 확인</LabelGroup.BigLabel>
                <CustomInput {...register("passwordConfirm")} type="password" />
                {errors.passwordConfirm && (
                    <LabelGroup.SmallLabel>{errors.passwordConfirm.message}</LabelGroup.SmallLabel>
                )}
            </LabelGroup>
            <LabelGroup isRed={errors.nickname}>
                <LabelGroup.BigLabel>닉네임</LabelGroup.BigLabel>
                <CustomInput {...register("nickname")} />
                {errors.nickname && (
                    <LabelGroup.SmallLabel>{errors.nickname.message}</LabelGroup.SmallLabel>
                )}
            </LabelGroup>

            <CustomButton>submit</CustomButton>
        </form>
    );
};

const ThePottFormTestPage = () => {
    return (
        <div>
            <TutorialForm />
        </div>
    );
};

export default ThePottFormTestPage;
