import SocialLoginButton from "../features/login/SocialLoginButton";
import CustomButton from "../package/customButton/CustomButton";
import CustomInputLabeled from "../package/CustomInputLabeled";
import { FullScreen, Vstack } from "../package/layout";
import RoundBox from "../package/RoundBox";

const inputPropsDict = {
    이메일: {
        name: "email",
        type: "email",
        autoComplete: "email",
    },
    비밀번호: {
        name: "password",
        type: "password",
        autoComplete: "new-password",
    },
};
const inputPropsEntryArray = Object.entries(inputPropsDict);

const LoginPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = event.target;
        const body = { email: email.value, password: password.value };
        // TODO: 실제로 여기에서 요청 보내야 함
        console.log({ body });
    };

    return (
        <FullScreen center>
            <RoundBox padding="LG">
                <Vstack gap="xl">
                    <Vstack style={{ width: "400px" }}>
                        <form onSubmit={handleSubmit}>
                            <Vstack>
                                {inputPropsEntryArray.map((entry) => (
                                    <CustomInputLabeled
                                        key={entry[0]}
                                        label={entry[0]}
                                        {...entry[1]}
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
