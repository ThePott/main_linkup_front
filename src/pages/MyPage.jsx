import React, { useEffect, useState } from "react";
import Sidebar from "../features/mypage/Sidebar.jsx";
import RoundBox from "../package/RoundBox.jsx";
import DeleteAccountModal from "../features/mypage/DeleteAccountModal.jsx";
import useLinkUpStore from "../shared/store/store";
import { apiAuthMe } from "../shared/services/linkupApi.js";
import "./MyPage.css";

// 카드 데이터 (임시)
const cardData = [
  { id: 1, title: "카드 1" },
  { id: 2, title: "카드 2" },
  { id: 3, title: "카드 3" },
  { id: 4, title: "카드 4" },
  { id: 5, title: "카드 5" },
  { id: 6, title: "카드 6" },
  { id: 7, title: "카드 7" },
  { id: 8, title: "카드 8" },
];

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const accessToken = useLinkUpStore((state) => state.access_token);
  const storeUser = useLinkUpStore((state) => state.user);

  // 로그인 정보가 store에 있는 경우 바로 표시
  useEffect(() => {
    if (!accessToken) return;

    const fetchUserInfo = async () => {
      try {
        const data = await apiAuthMe("GET"); // 로그인 사용자 정보 갱신
        setUserInfo(data);
      } catch (err) {
        console.error("회원 정보 가져오기 실패:", err);
      }
    };

    // store에 user가 없으면 서버에서 가져오기, 있으면 바로 사용
    if (!storeUser) {
      fetchUserInfo();
    } else {
      setUserInfo(storeUser);
    }
  }, [accessToken, storeUser]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  // 통계 (나중에 API 연동 가능)
  const userStats = {
    following: userInfo.following ?? 0,
    likes: userInfo.likes ?? 0,
    posts: userInfo.posts ?? 0,
  };

  return (
    <div className="mypage-wrapper">
      {/* 사용자 프로필 */}
      <div className="profile-feed">
        <div className="profile-box">
          <img
            src={userInfo.profile || "default-profile.png"}
            alt={userInfo.name}
            className="user-profile"
          />
          <div className="user-info">
            <span className="user-name">{userInfo.name}</span>
            <div className="user-stats">
              <span>팔로잉: {userStats.following}</span>
              <span>좋아요: {userStats.likes}</span>
              <span>포스트: {userStats.posts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="mypage-container">
        <div className="mypage-content">
          {/* 카드 피드 */}
          <div className="card-grid">
            {cardData.map((card) => (
              <RoundBox key={card.id}>{card.title}</RoundBox>
            ))}
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <Sidebar />
      </div>

      {/* 회원 탈퇴 모달 */}
      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeleted={() => {
          alert("탈퇴 완료! 메인 페이지로 이동합니다.");
          window.location.href = "/";
        }}
      />
    </div>
  );
};

export default MyPage;