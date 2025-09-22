import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import FileInput from "../../package/FileInput";
import CustomButton from "../../package/customButton/CustomButton";
import Modal from "../../package/modal/Modal";
import styles from "./FanPostWriteContent.module.css";

import subscribeArray from "../../shared/store/dummy2Heehaa.json";

const FanPostWriteContent = ({ onSubmit }) => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [completedModalOpen, setCompletedModalOpen] = useState(false);
    const [exitConfirmModalOpen, setExitConfirmModalOpen] = useState(false);

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const imageFile = formData.get("image_url");
        if (
            !imageFile ||
            (imageFile.size !== undefined && imageFile.size === 0)
        ) {
            setShowImageModal(true);
            return;
        }
        setConfirmModalOpen(true);
    };

    const handleConfirm = () => {
        setConfirmModalOpen(false);
        const form = document.querySelector(`form.${styles.form}`);
        if (!form) return;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);

        setCompletedModalOpen(true);
        setTimeout(() => {
            setCompletedModalOpen(false);
            navigate("/mypage");
        }, 2000);
    };

    const handleExit = () => {
        setExitConfirmModalOpen(true);
    };

    const handleExitConfirmYes = () => {
        setExitConfirmModalOpen(false);
        setTimeout(() => {
            navigate("/mypage");
        }, 1000);
    };

    const handleExitConfirmNo = () => {
        setExitConfirmModalOpen(false);
    };

    const handleCloseImageModal = () => setShowImageModal(false);
    const handleCancelConfirm = () => setConfirmModalOpen(false);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fileContainer}>
                    <FileInput className={styles.inputBox} name="image_url" />
                    <CustomButton
                        className={`${styles.btn} ${styles.exitBtn}`}
                        onClick={handleExit}
                        type="button"
                    >
                        나가기
                    </CustomButton>
                </div>
                <div className={styles.content}>
                    <select
                        name="artist_name"
                        ref={inputRef}
                        className={styles.select}
                        required
                    >
                        {subscribeArray.map((artist) => (
                            <option
                                key={artist.artist_id}
                                value={artist.artist_name}
                            >
                                {artist.artist_name}
                            </option>
                        ))}
                    </select>

                    <textarea
                        className={styles.textarea}
                        name="post_content"
                        placeholder="내용을 입력해 주세요."
                        required
                    ></textarea>

                    <div className={styles.btnWrapper}>
                        <CustomButton className={styles.btn} type="submit">
                            출간하기
                        </CustomButton>
                    </div>
                </div>
            </form>

            {exitConfirmModalOpen && (
                <Modal
                    isOn={exitConfirmModalOpen}
                    onBackgroundClick={handleExitConfirmNo}
                >
                    <p className={styles.exitText}>
                        정말 페이지를 벗어나시겠습니까?
                        <br /> 내용이 저장되지 않습니다.
                    </p>
                    <div className={styles.exitModalBtn}>
                        <CustomButton onClick={handleExitConfirmYes}>
                            네
                        </CustomButton>
                        <CustomButton onClick={handleExitConfirmNo}>
                            아니오
                        </CustomButton>
                    </div>
                </Modal>
            )}

            {showImageModal && (
                <Modal
                    isOn={showImageModal}
                    onBackgroundClick={handleCloseImageModal}
                >
                    <p>이미지를 첨부해주세요.</p>
                    <CustomButton onClick={handleCloseImageModal}>
                        닫기
                    </CustomButton>
                </Modal>
            )}

            {confirmModalOpen && (
                <Modal
                    isOn={confirmModalOpen}
                    onBackgroundClick={handleCancelConfirm}
                >
                    <p>정말 출간하시겠습니까?</p>
                    <div className={styles.confirmModalBtn}>
                        <CustomButton onClick={handleConfirm}>
                            확인
                        </CustomButton>
                        <CustomButton onClick={handleCancelConfirm}>
                            아니오
                        </CustomButton>
                    </div>
                </Modal>
            )}

            {completedModalOpen && (
                <Modal
                    isOn={completedModalOpen}
                    onBackgroundClick={() => setCompletedModalOpen(false)}
                >
                    <p>출간되었습니다.</p>
                </Modal>
            )}
        </>
    );
};

export default FanPostWriteContent;
