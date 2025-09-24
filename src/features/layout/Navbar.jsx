import { Link, useNavigate, useSearchParams } from "react-router";
import styles from "./Navbar.module.css";
import CustomInput from "../../package/CustomInput";
import { Hstack } from "../../package/layout";
import CustomButton from "../../package/customButton/CustomButton";
import useLinkUpStore from "../../shared/store/store";

const SideSection = ({ justify, children, ...props }) => (
    <Hstack justify={justify} className={styles.sideSection} {...props}>
        {children}
    </Hstack>
);

const Navbar = () => {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();

    const user = useLinkUpStore((state) => state.user);
    const setUser = useLinkUpStore((state) => state.setUser);
    const setAccessToken = useLinkUpStore((state) => state.setAccessToken);

    const handleSearch = (keyword) => {
        const trimmed = keyword.trim();
        setSearchParams({ query: trimmed });
    };

    const handleLogout = () => {
        setUser(null);
        setAccessToken(null);
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
                    {user ? (
                        <> 
                            {user.user_type === "admin" ? (
                                <CustomButton onClick={() => navigate("/super-user")}> 
                                    관리페이지
                                </CustomButton> //유저 권한에 따라서 버튼 변경
                            ) : (
                                <CustomButton onClick={() => navigate("/mypage")}>
                                    마이페이지
                                </CustomButton> //유저 권한에 따라서 버튼 변경
                            )}
                            <CustomButton onClick={handleLogout}>
                                로그아웃
                            </CustomButton>
                        </>
                    ) : (
                        <CustomButton onClick={() => navigate("/login")}>
                            로그인
                        </CustomButton>
                    )}
                </SideSection>
            </Hstack>
        </Hstack>
    );
};

export default Navbar;