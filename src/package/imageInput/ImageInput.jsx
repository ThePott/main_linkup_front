import styles from "./ImageInput.module.css";
import { useEffect, useRef, useState } from "react";
import RoundBox from "../RoundBox";
import CustomButton from "../customButton/CustomButton";

const PLACEHOLDER_IMAGE =
    "https://plus.unsplash.com/premium_photo-1738592736106-a17b897c0ab1?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ImageInput = ({ name, defaultSrc }) => {
    const defaultPreview = defaultSrc || PLACEHOLDER_IMAGE;
    const [file, setFile] = useState();
    const [preview, setPreview] = useState(defaultPreview);
    const inputRef = useRef();

    const handleChange = (event) => {
        const nextFile = event.target.files[0];
        setFile(nextFile);
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(() => {
        if (!file) {
            setPreview(defaultPreview);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    useEffect(() => {
        if (!defaultSrc) {
            return;
        }
        setPreview(defaultSrc);
    }, [defaultSrc]);

    return (
        <RoundBox>
            <input hidden name={name} type="file" onChange={handleChange} ref={inputRef} />
            <img src={preview} className={styles.preview} onClick={handleClick} />
        </RoundBox>
    );
};

export default ImageInput;
