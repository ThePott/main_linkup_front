import React, { useState } from "react";
import "./Sidebar.css";
import Modal from "../../package/modal/Modal.jsx"; // 모달 컴포넌트
import CustomButton from "../../package/customButton/CustomButton.jsx"; // 커스텀 버튼

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

  const handleDeleteClick = () => setShowModal(true);
  const handleConfirmDelete = () => {
    setShowModal(false);
    alert("탈퇴가 완료되었습니다."); // API 호출 자리
  };

  const handlePasswordChangeClick = () => {
    console.log("비밀번호 변경 버튼 클릭됨");
    setShowPasswordModal(true);
  };
  const handleConfirmPasswordChange = () => {
    setShowPasswordModal(false);
    alert("비밀번호 변경 기능 실행");
  };

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
            <CustomButton color="MONO" shape="RECTANGLE" >
              이메일 변경
            </CustomButton>
            <CustomButton color="MONO" shape="RECTANGLE" onClick={handlePasswordChangeClick}>
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
            <CustomButton color="RED" shape="RECTANGLE" onClick={handleDeleteClick}>
              회원 탈퇴
            </CustomButton>
          </div>
        )}
      </div>

      {/* 🔹 비밀번호 변경 모달 */}
      <Modal isOn={showPasswordModal} onBackgroundClick={() => setShowPasswordModal(false)}>
        <h2>비밀번호 변경</h2>
        <p>새 비밀번호를 입력하세요.</p>
        <input
          type="password"
          placeholder="새 비밀번호"
          style={{
            marginTop: "10px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <CustomButton color="BLUE" shape="RECTANGLE" onClick={handleConfirmPasswordChange}>
            확인
          </CustomButton>
          <CustomButton color="MONO" shape="RECTANGLE" onClick={() => setShowPasswordModal(false)}>
            취소
          </CustomButton>
        </div>
      </Modal>

      {/* 회원 탈퇴 모달창 */}
      <Modal isOn={showDeleteModal} onBackgroundClick={() => setShowDeleteModal(false)}>
        <h2>정말 탈퇴하시겠습니까?</h2>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <CustomButton color="RED" shape="RECTANGLE" onClick={handleConfirmDelete}>
            예
          </CustomButton>
          <CustomButton color="MONO" shape="RECTANGLE" onClick={() => setShowModal(false)}>
            아니오
          </CustomButton>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;