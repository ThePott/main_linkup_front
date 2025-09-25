import { Link, useNavigate, useSearchParams } from "react-router";
import styles from "./Navbar.module.css";
import CustomInput from "../../package/CustomInput";
import { Hstack } from "../../package/layout";
import CustomButton from "../../package/customButton/CustomButton";
import useLinkUpStore from "../../shared/store/store";
import useNavbar from "./useNavbar";

const SideSection = ({ justify, children, ...props }) => (
    <Hstack justify={justify} className={styles.sideSection} {...props}>
        {children}
    </Hstack>
);

const FanMypageButton = () => {
    const navigate = useNavigate();
    return (
        <CustomButton onClick={() => navigate("/mypage")}>마이페이지</CustomButton> //유저 권한에 따라서 버튼 변경
    );
};
const AgencyMypageButton = () => {
    const navigate = useNavigate();
    return (
        <CustomButton onClick={() => navigate("/agency")}>소속사 페이지</CustomButton> //유저 권한에 따라서 버튼 변경
    );
};
const SuperuserMypageButton = () => {
    const navigate = useNavigate();
    return (
        <CustomButton onClick={() => navigate("/super-user")}>관리페이지</CustomButton> //유저 권한에 따라서 버튼 변경
    );
};

const MyButton = ({ user }) => {
    if (!user) {
        return null;
    }
    switch (user.user_type) {
        case "fan":
            return <FanMypageButton />;
        case "company":
            return <AgencyMypageButton />;
        case "admin":
            return <SuperuserMypageButton />;
    }
};

const Navbar = () => {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();

    const user = useLinkUpStore((state) => state.user);

    const { logout } = useNavbar();

    const handleSearch = (keyword) => {
        const trimmed = keyword.trim();
        setSearchParams({ query: trimmed });
    };

    return (
        <Hstack justify="center" items="center">
            <Hstack items="center" justify="space-between" className={styles.navbar}>
                <SideSection justify="start">
                    <Link to="/" className={styles.logo}>
                        Logo
                    </Link>
                </SideSection>

                <CustomInput
                    placeholder="검색어를 입력해주세요"
                    onEnter={handleSearch}
                    className={styles.searchbar}
                />

                <SideSection justify="end">
                    <MyButton user={user} />
                    {user && <CustomButton onClick={logout}>로그아웃</CustomButton>}
                    {!user && (
                        <CustomButton onClick={() => navigate("/login")}>로그인</CustomButton>
                    )}
                </SideSection>
            </Hstack>
        </Hstack>
    );
};

export default Navbar;

