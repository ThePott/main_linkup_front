import styles from "./CommentBox.module.css";
import { getTimeAgo } from "../shared/utils/dateUtils";

const CommentBox = ({ comment }) => {
    const { content, created_at } = comment;
    const timeAgo = getTimeAgo(created_at);

    return (
        <li className={styles.items}>
            <span className={styles.text}>{content}</span>
            <span className={styles.text}>{timeAgo}</span>
        </li>
    );
};

export default CommentBox;
