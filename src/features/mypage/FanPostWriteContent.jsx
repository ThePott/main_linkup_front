import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useLinkUpStore from "../../shared/store/store";
import FileInput from "../../package/FileInput";
import CustomButton from "../../package/customButton/CustomButton";
import Modal from "../../package/modal/Modal";
import { useMutation } from "@tanstack/react-query";
import styles from "./FanPostWriteContent.module.css";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import useAuth from "../../shared/services/useAuth";
import queryClient from "../../shared/services/queryClient";

const FanPostWriteContent = () => {
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const [showImageModal, setShowImageModal] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [exitConfirmModalOpen, setExitConfirmModalOpen] = useState(false);

    useAuth();

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const queryEndpoint = "/api/auth/me";
    const mutationEndpoint = "/api/posts";

    const postMutation = useMutation({
        mutationFn: (body) => axiosReturnsData("POST", mutationEndpoint, body),

        onMutate: async (body) => {
            await queryClient.cancelQueries({ queryKey: [queryEndpoint] });
            const previousUser = queryClient.getQueryData([queryEndpoint]);

            const newPost = {
                post_content: body.get("post_content"),
                artist_id: body.get("artist_id"),
                imageFile: body.get("post_image"),
            };

            const newUser = {
                ...previousUser,
                posts: [...(previousUser?.posts || []), newPost],
            };
            queryClient.setQueryData([queryEndpoint], newUser);
            return { previousUser };
        },
        onSuccess: (data) => {
            setModalKey("completed");
            setTimeout(() => {
                setModalKey(null);
                navigate("/mypage");
            }, 2000);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [queryEndpoint] });
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const imageFile = formData.get("post_image");
        if (!imageFile || (imageFile.size !== undefined && imageFile.size === 0)) {
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
        postMutation.mutate(formData);
    };

    const handleExit = () => setExitConfirmModalOpen(true);

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
                    <FileInput className={styles.inputBox} name="post_image" />
                    <CustomButton
                        className={`${styles.btn} ${styles.exitBtn}`}
                        onClick={handleExit}
                        type="button"
                    >
                        나가기
                    </CustomButton>
                </div>
                <div className={styles.content}>
                    <select name="artist_id" ref={inputRef} className={styles.select} required>
                        {artistArray.map((artist) => (
                            <option key={artist.artist_id} value={artist.artist_id}>
                                {artist.group_name || artist.stage_name}
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

            <Modal isOn={exitConfirmModalOpen} onBackgroundClick={handleExitConfirmNo}>
                <p className={styles.exitText}>
                    정말 페이지를 벗어나시겠습니까?
                    <br /> 내용이 저장되지 않습니다.
                </p>
                <div className={styles.exitModalBtn}>
                    <CustomButton onClick={handleExitConfirmYes}>네</CustomButton>
                    <CustomButton onClick={handleExitConfirmNo}>아니오</CustomButton>
                </div>
            </Modal>

            <Modal isOn={showImageModal} onBackgroundClick={handleCloseImageModal}>
                <p>이미지를 첨부해주세요.</p>
                <CustomButton onClick={handleCloseImageModal}>닫기</CustomButton>
            </Modal>

            <Modal isOn={confirmModalOpen} onBackgroundClick={handleCancelConfirm}>
                <p>정말 출간하시겠습니까?</p>
                <div className={styles.confirmModalBtn}>
                    <CustomButton onClick={handleConfirm}>확인</CustomButton>
                    <CustomButton onClick={handleCancelConfirm}>아니오</CustomButton>
                </div>
            </Modal>

            <Modal isOn={modalKey === "completed"} onBackgroundClick={() => setModalKey(null)}>
                <p>출간되었습니다.</p>
            </Modal>
        </>
    );
};

export default FanPostWriteContent;
