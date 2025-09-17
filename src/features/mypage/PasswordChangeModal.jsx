import React, { useState } from "react";
import Modal from "../../package/modal/Modal.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    console.log({ currentPassword, newPassword, confirmPassword });

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
     /* // ✅ 백엔드 API 호출
    try {
      const response = await fetch("http://localhost:3000/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

        if (!response.ok) {
            throw new Error("비밀번호 변경 실패");
        }

        const data = await response.json();
        console.log("API 응답:", data);

        alert("비밀번호 변경이 완료되었습니다.");
        onClose();
        form.reset();} 

        catch (err) {
            console.error(err);
            alert("비밀번호 변경 중 오류가 발생했습니다.");
            }
      }; */

    alert("비밀번호 변경이 완료되었습니다.");
    onClose();
    form.reset();
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