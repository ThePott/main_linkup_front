import { React, useState } from "react";
import useLinkUpStore from "../../shared/store/store";
import CommentColumn from "../../package/CommentColumn";
import styles from "./MyFanPostModal.module.css";
import Modal from "../../package/modal/Modal";
import CustomImageCard from "../../shared/CustomImageCard/CustomImageCard";
import ArrowLeft from "../ArrowLeft";
import ArrowRight from "../ArrowRight";

const MyFanPostModal = () => {
    const selectedFanPost = useLinkUpStore((state) => state.selectedFanPost);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const modalKey = useLinkUpStore((state) => state.modalKey);

    const handleClose = () => setModalKey(null);

    if (!selectedFanPost) return null;

    // const [page, setPage] = useState(0);
    // const totalPages = fanPostArray.length;
    // const currentPost = fanPostArray[page];

    const artist =
        selectedFanPost.artist_name || selectedFanPost.group_name || "구독 아이돌 정보가 없습니다.";
    const content = selectedFanPost.content || "작성한 메시지가 없습니다.";

    return (
        <Modal isOn={modalKey === "fanPost"} onBackgroundClick={handleClose}>
            <div className={styles.container}>
                <section>
                    <CustomImageCard url={selectedFanPost.image_url} />
                    <section className={styles.content}>
                        <div>{artist}</div>
                        <div>{content}</div>
                    </section>
                </section>
                <CommentColumn />

                {/* {page > 0 && (
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
                )} */}
            </div>
        </Modal>
    );
};

export default MyFanPostModal;
