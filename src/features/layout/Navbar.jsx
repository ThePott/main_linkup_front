import { Link, useNavigate, useSearchParams } from "react-router";
import styles from "./Navbar.module.css";
import CustomInput from "../../package/CustomInput";
import { Hstack } from "../../package/layout";
import CustomButton from "../../package/customButton/CustomButton";
import useLinkUpStore from "../../shared/store/dummyMijin";
import useRealLinkupStore from "../../shared/store/store";

const SideSection = ({ justify, children, ...props }) => {
    return (
        <Hstack justify={justify} className={styles.sideSection} {...props}>
            {children}
        </Hstack>
    );
};

const Navbar = () => {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();

    const groupArray = useLinkUpStore((state) => state.groupArray);
    const setSearchResultArray = useLinkUpStore((state) => state.setSearchResultArray);
    const setSearchStatus = useLinkUpStore((state) => state.setSearchStatus);

    const user = useRealLinkupStore((state) => state.user);
    const setUser = useRealLinkupStore((state) => state.setUser);
    const setAccessToken = useRealLinkupStore((state) => state.setAccessToken);

    const handleSearch = (keyword) => {
        const trimmed = keyword.trim();

        setSearchParams({ query: trimmed });

        if (trimmed === "") {
            setSearchResultArray([]);
            setSearchStatus("fail");
            return;
        }

        const filtered = groupArray.filter(
            (g) =>
                g.name?.includes(trimmed) ||
                (g.memberArray || []).some((m) => m.name?.includes(trimmed))
        );

        setSearchResultArray(filtered);
        setSearchStatus(filtered.length === 0 ? "fail" : "success");
    };

    const handleLogout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return (
        <Hstack justify="center" items="center">
            <Hstack
                items="center"
                justify="space-between"
                className={styles.navbar}
            >
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
                            <CustomButton onClick={() => navigate("/mypage")}>
                                마이페이지
                            </CustomButton>
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