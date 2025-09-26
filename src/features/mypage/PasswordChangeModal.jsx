import React, { useState } from "react";
import Modal from "../../package/modal/Modal.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import { apiChangePassword } from "../../shared/services/linkupApi.js";

const PasswordChangeModal = ({ isOn, onClose }) => {
  const [resultModal, setResultModal] = useState({
    open: false,
    message: "",
    onConfirm: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    try {
      // 비밀번호 변경 API 호출
      await apiChangePassword(currentPassword, newPassword, confirmPassword);

      // 성공 모달 열기
      setResultModal({
        open: true,
        message: "비밀번호 변경이 완료되었습니다.",
        onConfirm: () => {
          setResultModal((prev) => ({ ...prev, open: false }));
          onClose();
          form.reset();
        },
      });
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);

      const detail = error.response?.data?.detail;
      const errorMessage = Array.isArray(detail)
        ? detail.map((d) => d.msg).join("\n")
        : typeof detail === "string"
        ? detail
        : "비밀번호 변경 중 오류가 발생했습니다.";

      setResultModal({
        open: true,
        message: errorMessage,
        onConfirm: () => {
          setResultModal((prev) => ({ ...prev, open: false }));
        },
      });
    }
  };

  return (
    <>
      {/* 비밀번호 변경 입력 모달 */}
      <Modal isOn={isOn} onBackgroundClick={onClose}>
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

      {/* 결과 모달 */}
      <Modal
        isOn={resultModal.open}
        onBackgroundClick={resultModal.onConfirm}
      >
        <h2>{resultModal.message}</h2>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomButton
            color="MONO"
            shape="RECTANGLE"
            onClick={resultModal.onConfirm}
          >
            확인
          </CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default PasswordChangeModal;