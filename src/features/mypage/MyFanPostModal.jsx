import { React, useState } from "react";
import useLinkUpStore from "../../shared/store/store";
import CommentColumn from "../../package/CommentColumn";
import Like from "../../package/Like";
import styles from "./MyFanPostModal.module.css";
import Modal from "../../package/modal/Modal";
import CustomImageCard from "../../shared/CustomImageCard/CustomImageCard";
import ArrowLeft from "../ArrowLeft";
import ArrowRight from "../ArrowRight";

const MyFanPostModal = ({ isOn, onClose }) => {
    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    const [page, setPage] = useState(0);
    const totalPages = fanPostArray.length;

    console.log("myfanpost-modal", fanPostArray);
    if (!isOn) return null;

    const currentPost = fanPostArray[page];

    const imgSrc =
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
                <CommentColumn />

                {page > 0 && (
                    <button
                        className={styles.arrowLeft}
                        onClick={() => setPage((p) => p - 1)}
                        aria-label="이전 팬포스트"
                    >
                        <ArrowLeft />
                    </button>
                )}
                {page < totalPages - 1 && (
                    <button
                        className={styles.arrowRight}
                        onClick={() => setPage((p) => p + 1)}
                        aria-label="다음 팬포스트"
                    >
                        <ArrowRight />
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default MyFanPostModal;
