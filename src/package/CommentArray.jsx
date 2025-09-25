import React from "react";
import styles from "./CommentArray.module.css";

const CommentArray = ({ item }) => {
    const { text, date } = item;

    return (
        <li className={styles.items}>
            <span className={styles.text}>{text} </span>
            <span className={styles.text}>{date}</span>
        </li>
    );
};

export default CommentArray;
