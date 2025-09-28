import styles from "./LoginPage.module.css";
import { Link } from "react-router";
import SocialLoginButton from "../features/login/loginComponents/SocialLoginButton";
import { loginInputPropsEntryArray } from "../features/login/loginServices/loginInputProps";
import CustomButton from "../package/customButton/CustomButton";
import CustomInputLabeled from "../package/CustomInputLabeled";
import { FullScreen, Hstack, Vstack } from "../package/layout";
import RoundBox from "../package/RoundBox";
import useAuth from "../shared/services/useAuth";

const LoginPage = () => {
    const { errorLogin, isPendingLogin, postLoginMutation } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        const { emailHTMLElement, passwordHTMLElement } = event.target;
        const body = {
            email: emailHTMLElement.value,
            password: passwordHTMLElement.value,
        };

        postLoginMutation.mutate(body);
    };

    return (
        <FullScreen center>
            <RoundBox padding="LG">
                <Vstack gap="xl">
                    <Vstack style={{ width: "400px" }}>
                        <form onSubmit={handleSubmit}>
                            <Vstack gap="xl">
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
