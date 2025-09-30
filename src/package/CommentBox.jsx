import React from "react";
import styles from "./CommentBox.module.css";

const CommentBox = ({ item }) => {
    const { content, created_at } = item;
    const formatted = new Date(created_at);
    const date = formatted.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <li className={styles.items}>
            <span className={styles.text}>{content}</span>
            <span className={styles.text}>{date.slice()}</span>
        </li>
    );
};

export default CommentBox;
