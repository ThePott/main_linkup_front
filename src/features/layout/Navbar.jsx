import { Link, useNavigate } from "react-router";

import styles from "./Navbar.module.css";
import CustomInput from "../../package/CustomInput";
import { Hstack } from "../../package/layout";
import CustomButton from "../../package/customButton/CustomButton";
import useLinkUpStore from "../../shared/store/dummyMijin";

const SideSection = ({ justify, children, ...props }) => {
    return (
        <Hstack justify={justify} className={styles.sideSection} {...props}>
            {children}
        </Hstack>
    );
};

const Navbar = () => {
  const navigate = useNavigate();
  const groupArray = useLinkUpStore((state) => state.groupArray);
  const setSearchResultArray = useLinkUpStore((state) => state.setSearchResultArray);
  const setSearchStatus = useLinkUpStore((state) => state.setSearchStatus);

  const handleSearch = (keyword) => {
    const trimmed = keyword.trim();
    if (trimmed === "") {
      setSearchResultArray([]);
      setSearchStatus("fail");
      navigate("/test/mijin");
      return;
    }

    const filtered = groupArray.filter(
      (g) =>
        g.name.includes(trimmed) ||
        g.memberArray.some((m) => m.name.includes(trimmed))
    );

    setSearchResultArray(filtered);

    if (filtered.length === 0) {
      setSearchStatus("fail");
    } else {
      setSearchStatus("success");
    }
    navigate("/test/mijin");
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
                    <CustomButton onClick={() => navigate("/mypage")}>
                        마이페이지
                    </CustomButton>
                    <CustomButton onClick={() => navigate("/login")}>
                        로그인
                    </CustomButton>
                </SideSection>
            </Hstack>
        </Hstack>
    );
};

export default Navbar;
