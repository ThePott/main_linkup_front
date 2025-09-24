import { React, useEffect, useRef, useState } from "react";
import styles from "./FileInput.module.css";
import CustomButton from "./customButton/CustomButton";

const FileInput = ({ name }) => {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState(null);
    const inputRef = useRef();

    const placeholderImage =
        "https://plus.unsplash.com/premium_photo-1738592736106-a17b897c0ab1?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const handleChange = (e) => {
        const nextFile = e.target.files[0];
        setFile(nextFile);
    };

    const handleClear = () => {
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    return (
        <div className={`${styles.container} `}>
            <input
                hidden
                name={name}
                type="file"
                onChange={handleChange}
                ref={inputRef}
            />
            <div className={styles.image}>
                <img
                    src={preview || placeholderImage}
                    className={styles.preview}
                    onClick={handleClick}
                />
            </div>

            {file && (
                <div className={styles.clear} onClick={handleClear}>
                    <CustomButton className={styles.icon}>X</CustomButton>
                </div>
            )}
        </div>
    );
};

export default FileInput;
