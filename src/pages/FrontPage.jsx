import { Link } from "react-router";
import CustomInput from "../package/CustomInput";
import styles from "./FrontPage.module.css";

const FrontPage = () => {
  const handleSearch = () => {
    // 검색 처리 로직
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default FrontPage;
