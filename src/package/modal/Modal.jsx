import RoundBox from "../RoundBox";
import styles from "./Modal.module.css";

const ModalContent = ({ children, ...props }) => {
    const handleClick = (event) => {
        event.stopPropagation();
    };
    return (
        <RoundBox padding="lg" {...props} onClick={handleClick}>
            {children}
        </RoundBox>
    );
};

const ModalBackdrop = ({ onBackgroundClick, children, ...props }) => {
    return (
        <div onClick={onBackgroundClick} className={styles.backdrop}>
            <ModalContent {...props}>{children}</ModalContent>
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
