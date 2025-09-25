import { React, useRef, useState } from "react";
import styles from "./CommentInput.module.css";
import CustomInput from "../package/CustomInput";
import CustomButton from "../package/customButton/CustomButton";

const CommentInput = ({ onAdd }) => {
    const [inputText, setInputText] = useState("");
    const isAdding = useRef(false);

    const handleAddComment = () => {
        if (isAdding.current) return;
        if (inputText.trim() === "") return;

        isAdding.current = true;

        const newComment = {
            id: Date.now(),
            text: inputText,
            date: new Date().toLocaleString(),
        };
        onAdd(newComment);
        setInputText("");
        isAdding.current = false;
    };
    return (
        <>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment();
                }}
            >
                <CustomInput
                    name="comment"
                    placeholder="댓글을 입력하세요"
                    value={inputText}
                    onChange={setInputText}
                    onClick={handleAddComment}
                    className={styles.input}
                />

                <CustomButton className={styles.button} type="submit">
                    Add
                </CustomButton>
            </form>
        </>
    );
};

export default CommentInput;
