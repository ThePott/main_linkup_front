import React from "react";
import Modal from "../../package/modal/Modal.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import { apiChangePassword } from "../../shared/services/linkupApi.js";

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    try {
      // 백엔드로 바로 전송(유효성 검사 로직은 흥주님이 가지고 계심)
      const response = await apiChangePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );
      console.log("API 응답:", response);
      alert("비밀번호 변경이 완료되었습니다.");
      onClose();
      form.reset();
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);

      const detail = error.response?.data?.detail;
      if (Array.isArray(detail)) {
        alert(detail.map((d) => d.msg).join("\n"));
      } else if (typeof detail === "string") {
        alert(detail);
      } else {
        alert("비밀번호 변경 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Modal isOn={isOpen} onBackgroundClick={onClose}>
      <h2>비밀번호 변경</h2>
      <form
        onSubmit={handleSubmit}
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
          name="currentPassword"
          placeholder="기존 비밀번호"
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="새 비밀번호"
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="새 비밀번호 확인"
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <CustomButton color="BLUE" shape="RECTANGLE" type="submit">
            확인
          </CustomButton>
          <CustomButton
            color="MONO"
            shape="RECTANGLE"
            type="button"
            onClick={onClose}
          >
            취소
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordChangeModal;