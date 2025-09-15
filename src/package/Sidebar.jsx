import React, { useState } from "react";
import "./Sidebar.css";
import Modal from "./modal/Modal.jsx";


const items = [
  { id: 1, title: "항목 A", description: "설명 A" },
  { id: 2, title: "항목 B", description: "설명 B" },
  { id: 3, title: "항목 C", description: "설명 C" },
];

const Sidebar = () => {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    alert("탈퇴가 완료되었습니다."); // API 호출 자리
  };

  return (
    <div className="sidebar">
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
            <button className="action-btn">이메일 변경</button>
            <button className="action-btn">비밀번호 변경</button>
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
            {/* Modal 열기 */}
            <button className="danger-btn" onClick={handleDeleteClick}>
              회원 탈퇴
            </button>
          </div>
        )}
      </div>

      {/* Modal 활용 */}
      <Modal isOn={showModal} onBackgroundClick={() => setShowModal(false)}>
        <h2>정말 탈퇴하시겠습니까?</h2>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button className="danger-btn" onClick={handleConfirmDelete}>
            예
          </button>
          <button className="action-btn" onClick={() => setShowModal(false)}>
            아니오
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
