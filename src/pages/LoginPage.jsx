import SocialLoginButton from "../features/login/loginComponents/SocialLoginButton";
import { loginInputPropsEntryArray } from "../features/login/loginServices/loginInputProps";
import { useLogin } from "../features/login/loginServices/useLogin";
import CustomButton from "../package/customButton/CustomButton";
import CustomInputLabeled from "../package/CustomInputLabeled";
import { FullScreen, Vstack } from "../package/layout";
import RoundBox from "../package/RoundBox";

const LoginPage = () => {
    const { error, isLoading, setBody } = useLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        const { emailHTMLElement, passwordHTMLElement } = event.target;
        const body = {
            email: emailHTMLElement.value,
            password: passwordHTMLElement.value,
        };

        setBody(body);
    };

    return (
        <FullScreen center>
            <RoundBox padding="LG">
                <Vstack gap="xl">
                    <Vstack style={{ width: "400px" }}>
                        <form onSubmit={handleSubmit}>
                            <Vstack>
                                {loginInputPropsEntryArray.map((entry) => (
                                    <CustomInputLabeled
                                        key={entry[0]}
                                        label={entry[0]}
                                        inputProps={entry[1]}
                                    />
                                ))}
                                <CustomButton>이메일로 로그인</CustomButton>
                            </Vstack>
                        </form>
                    </Vstack>

                    <Vstack>
                        <SocialLoginButton provider={"GOOGLE"} />
                        <SocialLoginButton provider={"KAKAO"} />
                        <SocialLoginButton provider={"FACEBOOK"} />
                    </Vstack>
                </Vstack>
            </RoundBox>
        </FullScreen>
    );
};

export default LoginPage;
