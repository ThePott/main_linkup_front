import styles from "./SocialLoginButtonLabel.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import { Hstack } from "../../../package/layout";
import FacebookIcon from "./FacebookIcon";
import GoogleIcon from "./GoogleIcon";
import KakaoIcon from "./KakaoIcon";
import { useSocialLogin } from "../loginServices/useLogin";

const providerToProps = {
    GOOGLE: {
        label: "구글로 로그인",
        buttonStyle: { "--bg": "var(--color-bg)" },
    },
    KAKAO: {
        label: "카카오로 로그인",
        labelStyle: { "--color": "black" },
        buttonStyle: { "--bg": "#FEE500" },
    },
    FACEBOOK: {
        label: "페이스북으로 로그인",
        labelStyle: {
            "--color": "white",
        },
        buttonStyle: {
            "--bg": "#1877f2",
        },
    },
};
const providerToIcon = {
    GOOGLE: <GoogleIcon />,
    KAKAO: <KakaoIcon />,
    FACEBOOK: <FacebookIcon />,
};

const SocialLoginButtonLabel = ({ children, ...props }) => {
    return <p {...props}>{children}</p>;
};

const SocialLoginButton = ({ provider }) => {
    const { error, isLoading, refetch } = useSocialLogin(provider);
    const props = providerToProps[provider];
    const Icon = providerToIcon[provider];

    return (
        <CustomButton
            style={props.buttonStyle}
            className={styles.socialLoginButton}
            onClick={refetch}
        >
            <Hstack>
                {Icon}
                <SocialLoginButtonLabel
                    style={props.labelStyle}
                    className={styles.socialLoginButtonLabel}
                >
                    {props.label}
                </SocialLoginButtonLabel>
            </Hstack>
        </CustomButton>
    );
};

export default SocialLoginButton;
