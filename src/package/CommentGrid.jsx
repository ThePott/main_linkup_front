import { React, useEffect, useRef, useState } from "react";
import styles from "./CommentGrid.module.css";
import CommentArray from "./CommentArray";
import AddComment from "./AddComment";

const CommentGrid = () => {
    const [text, setText] = useState([]);

    const inputRef = useRef(null);
    const handleAdd = (comment) => {
        setText([...text, comment]);
    };

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.scrollIntoView({ behavior: "smooth" });
    }, [text]);

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {text.map((comment) => (
                    <CommentArray key={comment.id} item={comment} />
                ))}
                <div ref={inputRef} />
            </ul>
            <AddComment onAdd={handleAdd} />
        </section>
    );
};

export default CommentGrid;
