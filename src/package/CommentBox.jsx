import styles from "./CommentBox.module.css";
import { getTimeAgo } from "../shared/utils/dateUtils";
import RoundBox from "./RoundBox";
import { Hstack } from "./layout";

const CommentBox = ({ comment }) => {
    const { content, created_at } = comment;
    const timeAgo = getTimeAgo(created_at);

    return (
        <RoundBox textAlign="start" isShadowed={false} padding="md">
            <Hstack gap="sm">
                <p className={styles.nickname}>{comment.user.nickname}</p>
                <p className={styles.timeAgo}>{timeAgo}</p>
            </Hstack>
            <p>{content}</p>
        </RoundBox>
    );
};

export default CommentBox;
