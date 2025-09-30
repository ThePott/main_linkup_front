import { React, useEffect, useMemo, useRef } from "react";
import CommentBox from "./CommentBox";
import CommentInput from "../shared/CommentInput";
import styles from "./CommentColumn.module.css";
import useLinkUpStore from "../shared/store/store";

const CommentColumn = () => {
    const selectedFanPost = useLinkUpStore((state) => state.selectedFanPost);
    const postId = selectedFanPost?.id;
    const comments = useLinkUpStore((state) => state.commentsByPostId[postId]);

    if (!selectedFanPost) return null;

    const inputRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {comments &&
                    comments.map((comment) => <CommentBox key={comment.id} item={comment} />)}
                <div ref={inputRef} />
            </ul>
            <CommentInput />
        </section>
    );
};

export default CommentColumn;
