import useLinkUpStore from "../../shared/store/store";
import CommentColumn from "../../package/CommentColumn";
import styles from "./MyFanPostModal.module.css";
import Modal from "../../package/modal/Modal";
import CustomImageCard from "../../shared/CustomImageCard/CustomImageCard";
import ArrowLeft from "../ArrowLeft";
import ArrowRight from "../ArrowRight";
import { Hstack, Vstack } from "../../package/layout";
import GridContainer from "../../package/gridContainer/GridContainer";
import CustomImageBanner from "../../shared/CustomImageBanner/CustomImageBanner";
import { useQuery } from "@tanstack/react-query";
import { axiosReturnsData } from "../../shared/services/axiosInstance";

const MyFanPostModal = () => {
    // const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    // const setSelectedFanPost = useLinkUpStore((state) => state.setSelectedFanPost);
    const selectedFanPost = useLinkUpStore((state) => state.selectedFanPost);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const modalKey = useLinkUpStore((state) => state.modalKey);

    const endpoint = `/api/posts/${selectedFanPost?.id}/comments`;
    const { data: commentArray } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
        enabled: Boolean(selectedFanPost),
    });

    const handleClose = () => setModalKey(null);

    if (!selectedFanPost) return null;

    const artistName =
        selectedFanPost.artist_name ||
        selectedFanPost.group_name ||
        "이름 정보를 불러올 수 없습니다";
    const content = selectedFanPost.content || "작성한 메시지가 없습니다.";
    const imageUrl = selectedFanPost.image_url || import.meta.env.VITE_PLACEHOLDER_IMAGE;

    return (
        <Modal
            isOn={modalKey === "fanPost"}
            onBackgroundClick={handleClose}
            className={styles.container}
        >
            <GridContainer cols={2} className={styles.grid}>
                <Vstack>
                    <img src={imageUrl} className={styles.image} />
                    <section className={styles.content}>
                        <div>{artistName}</div>
                        <div>{content}</div>
                    </section>
                </Vstack>
                <CommentColumn commentArray={commentArray} />
            </GridContainer>
        </Modal>
    );
};

export default MyFanPostModal;

{
    /* {page > 0 && (
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
                )} */
}
