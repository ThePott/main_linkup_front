import { Outlet } from "react-router";
import { Link } from "react-router"; 
import CustomInput from "../CustomInput";
import styles from "../../pages/FrontPage.module.css";

const Layout = () => {
  const handleSearch = () => {
    // 검색 처리 로직
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">Logo</Link>
        </div>

        <div className={styles.search}>
          <CustomInput
            placeholder="검색어를 입력해주세요"
            onEnter={handleSearch}
            style={{ width: "100%" }}
          />
        </div>

        <ul className={styles.navList}>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
        </ul>

        <button className={styles.loginButton}>로그인</button>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
