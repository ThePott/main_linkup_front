import styles from "./ImageInput.module.css";
import { useEffect, useRef, useState } from "react";
import RoundBox from "../RoundBox";

const PLACEHOLDER_IMAGE =
    "https://plus.unsplash.com/premium_photo-1738592736106-a17b897c0ab1?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ImageInput = ({ name, defaultSrc }) => {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState(defaultSrc ?? PLACEHOLDER_IMAGE);
    const inputRef = useRef();

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
        <RoundBox>
            <input
                hidden
                name={name}
                type="file"
                onChange={handleChange}
                ref={inputRef}
            />
            <img
                src={preview}
                className={styles.preview}
                onClick={handleClick}
            />

            {file && (
                <CustomButton
                    className={styles.closeButton}
                    onClick={handleClear}
                >
                    X
                </CustomButton>
            )}
        </RoundBox>
    );
};

export default ImageInput;
