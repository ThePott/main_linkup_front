import { useForm } from "react-hook-form";
import CustomInput from "../../../package/CustomInput";
import CustomButton from "../../../package/customButton/CustomButton";
import LabelGroup from "../../../package/labelGroup/LabelGroup";
import { inputNameToValidationProps } from "../../../shared/utils/validation";

const TutorialForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log({ data });
        if (errors) {
            console.log({ errors });
        }
    };

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <LabelGroup>
                <LabelGroup.BigLabel>이메일</LabelGroup.BigLabel>
                <CustomInput {...register("email", { type: "email", minLength: 100 })} />
                {errors.email && (
                    <LabelGroup.SmallLabel>This field is required</LabelGroup.SmallLabel>
                )}
            </LabelGroup>
            <LabelGroup>
                <LabelGroup.BigLabel>인증 번호</LabelGroup.BigLabel>
                <CustomInput {...register("verification_code")} />
                {errors.verification_code && (
                    <LabelGroup.SmallLabel>This field is required</LabelGroup.SmallLabel>
                )}
            </LabelGroup>
            <LabelGroup>
                <LabelGroup.BigLabel>비밀번호</LabelGroup.BigLabel>
                <CustomInput {...register("password")} />
                {errors.password && (
                    <LabelGroup.SmallLabel>This field is required</LabelGroup.SmallLabel>
                )}
            </LabelGroup>
            <LabelGroup>
                <LabelGroup.BigLabel>비밀번호 확인</LabelGroup.BigLabel>
                <CustomInput {...register("passwordConfirm")} />
                {errors.passwordConfirm && (
                    <LabelGroup.SmallLabel>This field is required</LabelGroup.SmallLabel>
                )}
            </LabelGroup>
            <LabelGroup>
                <LabelGroup.BigLabel>닉네임</LabelGroup.BigLabel>
                <CustomInput {...register("nickname")} />
                {errors.nickname && (
                    <LabelGroup.SmallLabel>This field is required</LabelGroup.SmallLabel>
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
