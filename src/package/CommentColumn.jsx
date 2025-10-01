import { useEffect, useRef } from "react";
import CommentBox from "./CommentBox";
import CommentInput from "../shared/CommentInput";
import styles from "./CommentColumn.module.css";
import { Vstack } from "./layout";
import FlexOneContainer from "./flexOneContainer/FlexOneContainer";

const CommentColumn = ({ commentArray = [] }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.scrollIntoView({ behavior: "smooth" });
    }, [commentArray]);

    return (
        <Vstack className={styles.container}>
            <FlexOneContainer isYScrollable>
                <Vstack>
                    {commentArray.map((comment) => (
                        <CommentBox key={comment.id} comment={comment} />
                    ))}
                    <div ref={inputRef} />
                </Vstack>
            </FlexOneContainer>
            <CommentInput />
        </Vstack>
    );
};

export default CommentColumn;
