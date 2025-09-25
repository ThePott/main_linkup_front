import { React, useState } from "react";
import useLinkUpStore from "../../shared/store/store";
import CommentGrid from "../../package/CommentGrid";
import Like from "../../package/Like";
import styles from "./MyFanPostModal.module.css";
import Modal from "../../package/modal/Modal";
import CustomImageCard from "../../shared/CustomImageCard/CustomImageCard";

const MyFanPostModal = ({ isOn, onClose }) => {
    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    const [page, setPage] = useState(0);
    const totalPages = fanPostArray.length;

    console.log("myfanpost-modal", fanPostArray);
    if (!isOn) return null;

    const currentPost = fanPostArray[page];

    const imgSrc =
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const arrowRight = (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
            ></path>
        </svg>
    );
    const arrowLeft = (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
            ></path>
        </svg>
    );

    return (
        <Modal isOn={isOn} onBackgroundClick={onClose}>
            <div className={styles.container}>
                <section>
                    <CustomImageCard url={imgSrc} />
                    <Like />
                    {/* api연동 시, 고쳐야 함 */}
                    <div className={styles.content}>
                        <div>구독 아이돌</div>
                        <div>작성한 메시지</div>
                    </div>
                </section>
                <CommentGrid />

                {page > 0 && (
                    <button
                        className={styles.arrowLeft}
                        onClick={() => setPage((p) => p - 1)}
                        aria-label="이전 팬포스트"
                    >
                        {arrowLeft}
                    </button>
                )}
                {page < totalPages - 1 && (
                    <button
                        className={styles.arrowRight}
                        onClick={() => setPage((p) => p + 1)}
                        aria-label="다음 팬포스트"
                    >
                        {arrowRight}
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default MyFanPostModal;
