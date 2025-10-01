import { React, useEffect, useMemo, useRef } from "react";
import CommentBox from "./CommentBox";
import CommentInput from "../shared/CommentInput";
import styles from "./CommentColumn.module.css";
import useLinkUpStore from "../shared/store/store";
import { Vstack } from "./layout";
import FlexOneContainer from "./flexOneContainer/FlexOneContainer";

const CommentColumn = () => {
    const selectedFanPost = useLinkUpStore((state) => state.selectedFanPost);
    const postId = selectedFanPost?.id;
    const comments = useLinkUpStore((state) => state.commentsByPostId[postId]);

    const inputRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

    if (!selectedFanPost) return null;

    return (
        <Vstack className={styles.container}>
            <FlexOneContainer>
                <ul className={styles.list}>
                    {comments &&
                        comments.map((comment) => <CommentBox key={comment.id} item={comment} />)}
                    <div ref={inputRef} />
                </ul>
            </FlexOneContainer>
            <CommentInput />
        </Vstack>
    );
};

export default CommentColumn;
