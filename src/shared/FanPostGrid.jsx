import styles from "./FanPostGrid.module.css";
import { useNavigate } from "react-router";
import GridCardContainer from "./GridCardContainer/GridCardContainer";
import CustomImageCard from "./CustomImageCard/CustomImageCard";
import RoundBox from "../package/RoundBox";
import useLinkUpStore from "./store/store";
import PlusIcon from "../package/icons/PlusIcon";

const AddCard = () => {
    const navigate = useNavigate();
    const handleCreate = () => navigate("/mypage/write");

    return (
        <RoundBox className={styles.addCard} onClick={handleCreate}>
            <PlusIcon className={styles.plusIcon} />
        </RoundBox>
    );
};

const FanPostCard = ({ fanPost, isBlurred }) => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedFanPost = useLinkUpStore((state) => state.setSelectedFanPost);

    const handleClick = () => {
        if (isBlurred) {
            triggerSubscribeModal();
            return;
        }
        triggerFanPostModal();
        return;
    };

    const triggerFanPostModal = () => {
        setModalKey("fanPost");
        setSelectedFanPost(fanPost);
        console.log({ fanPostClickMessage: "modalKey를 바꿔 팬 포스트 모달을 띄웁니다" });
    };

    const triggerSubscribeModal = () => {
        setModalKey("subscribe"); // << 뭔가 구독해야 볼 수 있다는 모달창을 보여주고 확인을 누르면 디테일 페이지로 넘어가게 해야 합니다
        console.log({ fanPostClickMessage: "modalKey를 바꿔 구독을 유도합니다" });
    };

    const url = fanPost?.image || import.meta.env.VITE_PLACEHOLDER_IMAGE;
    const alt = fanPost.stage_name ?? fanPost.group_name ?? "도대체 뭘 받은 거니...";

    const style = {};
    style["--blur"] = isBlurred ? "var(--spacing-sm)" : 0;

    return (
        <div className={styles.fanPostCardShell}>
            <CustomImageCard
                style={style}
                className={styles.fanPostCard}
                onClick={handleClick}
                url={url}
                alt={alt}
            />
        </div>
    );
};

const FanPostGrid = ({ fanPostArray, isMine, isBlurred = true }) => {
    return (
        <GridCardContainer>
            {isMine && <AddCard />}
            {fanPostArray.map((fanPost) => (
                <FanPostCard fanPost={fanPost} isBlurred={isBlurred} />
            ))}
        </GridCardContainer>
    );
};

export default FanPostGrid;
// <p>{post.artistName}</p>
// <p>{post.content}</p>
