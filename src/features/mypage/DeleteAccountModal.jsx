import React from "react";
import Modal from "../../package/modal/Modal.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import { deleteAccount } from "./UserApi.js";

const DeleteAccountModal = ({ isOpen, onClose, userId, onDeleted }) => {
    const handleConfirm = async () => {
    try {
      await deleteAccount(userId);
      alert("회원 탈퇴가 완료되었습니다.");
      if (onDeleted) onDeleted(); // 상위 컴포넌트에서 처리할 콜백
      onClose();
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <Modal isOn={isOpen} onBackgroundClick={onClose}>
      <h2>정말 탈퇴하시겠습니까?</h2>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <CustomButton color="RED" shape="RECTANGLE" onClick={handleConfirm}>
          예
        </CustomButton>
        <CustomButton color="MONO" shape="RECTANGLE" onClick={onClose}>
          아니오
        </CustomButton>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;