import CustomButton from "../../../package/customButton/CustomButton";
import { Hstack } from "../../../package/layout";
import FacebookIcon from "./FacebookIcon";
import GoogleIcon from "./GoogleIcon";
import KakaoIcon from "./KakaoIcon";

const providerToStyle = {
    GOOGLE: {
        style: { backgroundColor: "var(--color-bg)" },
        label: "구글로 로그인",
    },
    KAKAO: {
        style: { backgroundColor: "#FEE500" },
        label: "카카오로 로그인",
    },
    FACEBOOK: {
        style: {
            backgroundColor: "#1877f2",
            color: "var(--color-vivid-inverted)",
        },
        label: "페이스북으로 로그인",
    },
};
const providerToIcon = {
    GOOGLE: <GoogleIcon />,
    KAKAO: <KakaoIcon />,
    FACEBOOK: <FacebookIcon />,
};

const SocialLoginButton = ({ provider, style, ...props }) => {
    const Icon = providerToIcon[provider];
    return (
        <CustomButton
            {...props}
            style={{ ...providerToStyle[provider].style, ...style }}
        >
            <Hstack>
                {Icon}
                <p
                    style={{
                        flexGrow: 1,
                        fontWeight: "var(--font-weight-semibold)",
                    }}
                >
                    {providerToStyle[provider].label}
                </p>
            </Hstack>
        </CustomButton>
    );
};

export default SocialLoginButton;
