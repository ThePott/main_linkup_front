import React, { useState } from "react";
import "./Sidebar.css";

// 예시 데이터
const items = [
  { id: 1, title: "항목 A", description: "설명 A" },
  { id: 2, title: "항목 B", description: "설명 B" },
  { id: 3, title: "항목 C", description: "설명 C" },
];

const Sidebar = () => {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);

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
              <button className="action-btn">선택</button>
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
            <button className="danger-btn"> 회원 탈퇴 </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
