import React, { useState } from "react";
import Modal from "../../package/modal/Modal.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirm = () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
    // 👉 기존 비밀번호 검증 + 새 비밀번호 변경 API 호출 자리
    alert("비밀번호 변경이 완료되었습니다.");
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Modal isOn={isOpen} onBackgroundClick={handleClose}>
      <h2>비밀번호 변경</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <input
          type="password"
          placeholder="기존 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <CustomButton color="BLUE" shape="RECTANGLE" onClick={handleConfirm}>
          확인
        </CustomButton>
        <CustomButton color="MONO" shape="RECTANGLE" onClick={handleClose}>
          취소
        </CustomButton>
      </div>
    </Modal>
  );
};

export default PasswordChangeModal;