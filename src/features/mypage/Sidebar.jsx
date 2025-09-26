import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Sidebar.module.css";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import PasswordChangeModal from "./PasswordChangeModal.jsx";
import DeleteAccountModal from "./DeleteAccountModal.jsx";
import useLinkUpStore from "../../shared/store/store";

// 구독 목록 API
const fetchSubscriptions = async (accessToken) => {
  if (!accessToken) return [];
  const res = await fetch("/api/subscriptions/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("구독 목록 불러오기 실패");
  const data = await res.json();
  return data.filter((sub) => sub.is_active);
};

const Sidebar = () => {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);

  const accessToken = useLinkUpStore((state) => state.access_token);
  const modalKey = useLinkUpStore((state) => state.modalKey);
  const setModalKey = useLinkUpStore((state) => state.setModalKey);

  // 구독 목록 조회
  const { data: subscriptions = [], isLoading: isSubsLoading } = useQuery({
    queryKey: ["subscriptions", accessToken],
    queryFn: () => fetchSubscriptions(accessToken),
    enabled: !!accessToken,
  });

  return (
    <div className="sidebar">
      {/* 구독 항목 섹션 */}
      <div className="section">
        <h2>구독 중인 아티스트</h2>
        {isSubsLoading ? (
          <p>로딩 중...</p>
        ) : subscriptions.length === 0 ? (
          <p>구독 중인 아티스트가 없습니다.</p>
        ) : (
          <div className="item-list">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="item">
                <div className="item-info">
                  <span className="item-title">아티스트 {sub.artist_id}</span>
                  <span className="item-description">구독 중</span>
                </div>
                <CustomButton color="BLUE" shape="RECTANGLE">
                  선택
                </CustomButton>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 개인 정보 수정 섹션 */}
      <div className="section">
        <h2
          className="collapsible-header"
          onClick={() => setPersonalOpen(!personalOpen)}
        >
          개인 정보 수정 {personalOpen ? "▲" : "▼"}
        </h2>
        {personalOpen && (
          <div className="collapsible-content">
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
      <div className="section danger-section">
        <h2
          className="collapsible-header"
          onClick={() => setDangerOpen(!dangerOpen)}
        >
          회원 탈퇴 {dangerOpen ? "▲" : "▼"}
        </h2>
        {dangerOpen && (
          <div className="collapsible-content">
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