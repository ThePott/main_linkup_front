import React, { useState } from "react";
import Modal from "../../package/modal/Modal.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import { apiChangePassword } from "../../shared/services/linkupApi.js"; // api 연동 추가

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setErrorMessages(["새 비밀번호와 확인이 일치하지 않습니다."]);
      return;
    }

    try {
      await apiChangePassword(currentPassword, newPassword, confirmPassword);

      alert("비밀번호 변경이 완료되었습니다.");
      setErrorMessages([]);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      onClose();
    } catch (error) {
      console.error("비밀번호 변경 실패:", error.response?.data || error.message);

      const detail = error.response?.data?.detail;

      if (Array.isArray(detail)) {
        const msgs = detail.map((d) => d.msg || d);
        setErrorMessages(msgs);
      } else if (typeof detail === "string") {
        setErrorMessages([detail]);
      } else {
        setErrorMessages(["비밀번호 변경 중 오류가 발생했습니다."]);
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

        {/* 에러 메시지 표시 */}
        {errorMessages.length > 0 && (
          <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            {errorMessages.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
          </div>
        )}

        {/* 버튼 영역 */}
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