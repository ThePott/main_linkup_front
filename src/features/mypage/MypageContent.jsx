import { useEffect, useRef } from "react";
import styles from "./MypageContent.module.css";
import FileInput from "../../package/FileInput";
import CustomButton from "../../package/customButton/CustomButton";

const MypageContent = ({
    post = {
        post_id: "",
        user_nickname: "",
        image_url: "",
        post_content: "",
        post_created_at: "",
    },
    onSubmit,
    subscribeArray,
}) => {
    const inputRef = useRef(null);
    const submit = (formData) => {
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <form className={styles.form} action={submit}>
            <FileInput
                className={styles.inputBox}
                name="image_url"
                initialPreview={post.image_url}
            />
            <div className={styles.content}>
                <select
                    name="artist_name"
                    ref={inputRef}
                    className={styles.select}
                >
                    {subscribeArray.map((artist) => (
                        <option
                            key={artist.artist_id}
                            value={artist.artist_name}
                            required
                        >
                            {artist.artist_name}
                        </option>
                    ))}
                </select>

                <textarea
                    className={styles.textarea}
                    name="post_content"
                    defaultValue={post.post_content}
                    placeholder="내용을 입력해 주세요."
                    required
                ></textarea>

                <CustomButton className={styles.btn}>출간하기</CustomButton>
            </div>
        </form>
    );
};

export default MypageContent;
