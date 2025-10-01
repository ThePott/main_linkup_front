import { useState } from "react";
import styles from "./CommentInput.module.css";
import CustomInput from "../package/CustomInput";
import CustomButton from "../package/customButton/CustomButton";
import useLinkUpStore from "./store/store";
import { axiosReturnsData } from "./services/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import queryClient from "./services/queryClient";

const CommentInput = () => {
    const selectedFanPost = useLinkUpStore((state) => state.selectedFanPost);
    const user = useLinkUpStore((state) => state.user);
    const post_id = selectedFanPost?.id;
    const [inputText, setInputText] = useState("");

    const endpoint = `/api/posts/${post_id}/comments`;
    const postMutation = useMutation({
        mutationFn: ({ body }) => axiosReturnsData("POST", endpoint, body),
        onMutate: async ({ newOne }) => {
            await queryClient.cancelQueries({
                queryKey: [endpoint],
            });
            const previous = queryClient.getQueryData([endpoint]);
            queryClient.setQueryData([endpoint], [...previous, newOne]);
            return { previous };
        },
        onError: (error) => console.error(error),
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const { commentHtmlElement } = event.target;
        const value = commentHtmlElement.value;
        const body = {
            comment_content: value,
        };
        const newOne = { id: Date.now(), content: value, created_at: new Date(), user };
        postMutation.mutate({ body, newOne });
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <CustomInput
                    name="commentHtmlElement"
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
