import React, { useState } from "react";
import "./Sidebar.css";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import PasswordChangeModal from "./PasswordChangeModal.jsx";
import DeleteAccountModal from "./DeleteAccountModal.jsx";

// 예시 데이터
const items = [
  { id: 1, title: "항목 A", description: "설명 A" },
  { id: 2, title: "항목 B", description: "설명 B" },
  { id: 3, title: "항목 C", description: "설명 C" },
];

const Sidebar = () => {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    alert("탈퇴가 완료되었습니다."); // API 호출 자리
  };

  const handlePasswordChangeClick = () => setShowPasswordModal(true);

  return (
    <div className="sidebar">
      {/* 상단 섹션 */}
      <div className="section">
        <h2>관심 항목</h2>
        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item">
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                <span className="item-description">{item.description}</span>
              </div>
              <CustomButton color="BLUE" shape="RECTANGLE">
                선택
              </CustomButton>
            </div>
          ))}
        </div>
      </div>

      {/* 중간 섹션 */}
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
              onClick={handlePasswordChangeClick}
            >
              비밀번호 변경
            </CustomButton>
          </div>
        )}
      </div>

      {/* 하단 섹션 */}
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
              onClick={handleDeleteClick}
            >
              회원 탈퇴
            </CustomButton>
          </div>
        )}
      </div>

      {/* 모달들 */}
      <PasswordChangeModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Sidebar;