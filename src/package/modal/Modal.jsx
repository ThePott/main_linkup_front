import RoundBox from "../RoundBox";
import styles from "./Modal.module.css";

const ModalContent = ({ children }) => {
    const handleClick = (event) => {
        event.stopPropagation();
    };
    return (
        <div
            onClick={handleClick}
            style={{
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "var(--color-bg)",
                color: "white", //글자 색 흰색을 변경

                minWidth: "500px",
                maxWidth: "800px",
                maxHeight: "800px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "var(--drop-shadow-md)",
            }}
        >
            {children}
        </div>
    );
};

const ModalBackdrop = ({ onBackgroundClick, children }) => {
    return (
        <div onClick={onBackgroundClick} className={styles.backdrop}>
            <ModalContent>{children}</ModalContent>
        </div>
    );
};

const Modal = ({ isOn, onBackgroundClick, children, ...props }) => {
    if (!isOn) {
        return null;
    }
    return (
        <ModalBackdrop {...props} onBackgroundClick={onBackgroundClick}>
            {children}
        </ModalBackdrop>
    );
};

export default Modal;
