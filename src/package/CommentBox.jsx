import React from "react";
import styles from "./CommentBox.module.css";

const CommentBox = ({ item }) => {
    const { text, date } = item;

    return (
        <li className={styles.items}>
            <span className={styles.text}>{text} </span>
            <span className={styles.text}>{date}</span>
        </li>
    );
};

export default CommentBox;
