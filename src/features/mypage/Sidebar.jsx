import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate import
import styles from "./Sidebar.module.css";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import PasswordChangeModal from "./PasswordChangeModal.jsx";
import DeleteAccountModal from "./DeleteAccountModal.jsx";
import useLinkUpStore from "../../shared/store/store";
import useSubscriptions from "../../shared/services/useSubscriptions"; // 훅 import

const Sidebar = () => {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);

  const navigate = useNavigate(); // useNavigate 선언
  const modalKey = useLinkUpStore((state) => state.modalKey);
  const setModalKey = useLinkUpStore((state) => state.setModalKey);
  const artistArray = useLinkUpStore((state) => state.artistArray); // store에 저장된 구독 아티스트 목록

  // 구독 목록 조회 (훅 사용)
  const { isPendingSubscriptions } = useSubscriptions();

  return (
    <div className={styles.sidebar}>
      {/* 구독 항목 섹션 */}
      <div className={styles.section}>
        <h2>구독 중인 아티스트</h2>
        {isPendingSubscriptions ? (
          <p>로딩 중...</p>
        ) : !artistArray || artistArray.length === 0 ? (
          <p>구독 중인 아티스트가 없습니다.</p>
        ) : (
          <div className={styles["item-list"]}>
            {artistArray.map((sub) => (
              <div key={sub.id} className={styles.item}>
                <div className={styles["item-info"]}>
                  <span className={styles["item-title"]}>
                    {sub.group_name
                      ? sub.stage_name
                        ? `${sub.group_name} - ${sub.stage_name}` // 그룹 + 멤버
                        : sub.group_name // 그룹만
                      : sub.stage_name || `아티스트 ${sub.artist_id}`}
                  </span>
                  <span className={styles["item-description"]}>구독 중</span>
                </div>
                <CustomButton
                  color="BLUE"
                  shape="RECTANGLE"
                  onClick={() =>
                    navigate(`/detail/artist/${sub.artist_id}`) // 클릭 시 디테일 페이지 이동
                  }
                >
                  선택
                </CustomButton>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 개인 정보 수정 섹션 */}
      <div className={styles.section}>
        <h2
          className={styles.collapsibleHeader}
          onClick={() => setPersonalOpen(!personalOpen)}
        >
          개인 정보 수정 {personalOpen ? "▲" : "▼"}
        </h2>
        {personalOpen && (
          <div className={styles.collapsibleContent}>
            <CustomButton
              color="MONO"
              shape="RECTANGLE"
              onClick={() => setModalKey("passwordChange")}
            >
              비밀번호 변경
            </CustomButton>
          </div>
        )}
      </div>

      {/* 회원 탈퇴 섹션 */}
      <div className={`${styles.section} ${styles.dangerSection}`}>
        <h2
          className={styles.collapsibleHeader}
          onClick={() => setDangerOpen(!dangerOpen)}
        >
          회원 탈퇴 {dangerOpen ? "▲" : "▼"}
        </h2>
        {dangerOpen && (
          <div className={styles.collapsibleContent}>
            <CustomButton
              color="RED"
              shape="RECTANGLE"
              onClick={() => setModalKey("deleteAccount")}
            >
              회원 탈퇴
            </CustomButton>
          </div>
        )}
      </div>

      {/* 모달들 */}
      <PasswordChangeModal
        isOn={modalKey === "passwordChange"}
        onClose={() => setModalKey(null)}
      />
      <DeleteAccountModal
        isOn={modalKey === "deleteAccount"}
        onClose={() => setModalKey(null)}
      />
    </div>
  );
};

export default Sidebar;