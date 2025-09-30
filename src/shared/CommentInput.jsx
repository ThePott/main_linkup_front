import { React, useRef, useState } from "react";
import styles from "./CommentInput.module.css";
import CustomInput from "../package/CustomInput";
import CustomButton from "../package/customButton/CustomButton";
import useLinkUpStore from "./store/store";
import { axiosReturnsData } from "./services/axiosInstance";

const CommentInput = () => {
    const selectedFanPost = useLinkUpStore((state) => state.selectedFanPost);
    const addComment = useLinkUpStore((state) => state.addComment);
    const post_id = selectedFanPost?.id;
    const [inputText, setInputText] = useState("");
    const isAdding = useRef(false);

    const handleAddComment = async () => {
        if (isAdding.current) return;
        if (inputText.trim() === "") return;
        isAdding.current = true;

        const newComment = {
            id: Date.now(),
            comment_content: inputText,
        };
        const endpoint = `api/posts/${post_id}/comments`;
        const savedComment = await axiosReturnsData("POST", endpoint, newComment);
        addComment(post_id, savedComment);
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
                    name="comment_content"
                    placeholder="댓글을 입력하세요"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
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
