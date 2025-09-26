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

const FanPostCard = ({ fanPost }) => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedFanPost = useLinkUpStore((state) => state.setSelectedFanPost);

    const handleClick = () => {
        setModalKey("fanPost");
        setSelectedFanPost(fanPost);
    };

    const url = fanPost?.image ?? import.meta.env.VITE_PLACEHOLDER_IMAGE;
    const alt = fanPost.stage_name ?? fanPost.group_name ?? "도대체 뭘 받은 거니...";

    return <CustomImageCard onClick={handleClick} url={url} alt={alt} />;
};

const FanPostGrid = ({ fanPostArray }) => {
    return (
        <GridCardContainer>
            <AddCard />
            {fanPostArray.map((fanPost) => (
                <FanPostCard fanPost={fanPost} />
            ))}
        </GridCardContainer>
    );
};

export default FanPostGrid;
// <p>{post.artistName}</p>
// <p>{post.content}</p>
