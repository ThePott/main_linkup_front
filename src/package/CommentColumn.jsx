import { React, useEffect, useRef, useState } from "react";
import CommentBox from "./CommentBox";
import CommentInput from "../shared/CommentInput";
import styles from "./CommentColumn.module.css";

const CommentColumn = () => {
    const [comments, setComments] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

    const handleAdd = (comment) => {
        setComments((prev) => [...prev, comment]);
    };

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {comments.map((comment) => (
                    <CommentBox key={comment.id} item={comment} />
                ))}
                <div ref={inputRef} />
            </ul>
            <CommentInput onAdd={handleAdd} />
        </section>
    );
};

export default CommentColumn;
