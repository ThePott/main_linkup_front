import React, { useState } from "react";
import Modal from "../../package/modal/Modal.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import { apiAuthMe } from "../../shared/services/linkupApi.js";
import useLinkUpStore from "../../shared/store/store";
import useAuth from "../../shared/services/useAuth.js";

const DeleteAccountModal = ({ isOn, onClose }) => {
    const [resultModal, setResultModal] = useState({
        open: false,
        message: "",
        onConfirm: null,
    });
    const { logout } = useAuth();
    const handleConfirm = async () => {
        try {
            // 회원 탈퇴 API 호출
            await apiAuthMe("DELETE");

            logout();

            // 성공 모달 열기
            setResultModal({
                open: true,
                message: "회원 탈퇴가 완료되었습니다.",
                onConfirm: () => {
                    window.location.href = "/"; // 탈퇴 후 메인으로 이동
                    setResultModal((prev) => ({ ...prev, open: false }));
                },
            });
        } catch (error) {
            console.error("회원 탈퇴 실패:", error.response?.data || error.message);
            setResultModal({
                open: true,
                message: "회원 탈퇴에 실패했습니다.",
                onConfirm: () => {
                    setResultModal((prev) => ({ ...prev, open: false }));
                },
            });
        }
    };

    return (
        <>
            {/* 탈퇴 확인 모달 */}
            <Modal isOn={isOn} onBackgroundClick={onClose}>
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

            {/* 결과 모달 */}
            <Modal isOn={resultModal.open} onBackgroundClick={resultModal.onConfirm}>
                <h2>{resultModal.message}</h2>
                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <CustomButton color="MONO" shape="RECTANGLE" onClick={resultModal.onConfirm}>
                        확인
                    </CustomButton>
                </div>
            </Modal>
        </>
    );
};

export default DeleteAccountModal;

