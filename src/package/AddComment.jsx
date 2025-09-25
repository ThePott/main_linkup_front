import { React, useState } from "react";
import styles from "./AddComment.module.css";

const AddComment = ({ onAdd }) => {
    const [text, setText] = useState("");
    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length === 0) return;
        onAdd({
            id: Date.now(),
            text,
            date: new Date().toLocaleString(),
        });
        setText("");
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                name="text"
                value={text}
                onChange={handleChange}
            />
            <button className={styles.button}>Add</button>
        </form>
    );
};

export default AddComment;
