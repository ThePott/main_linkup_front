import RoundBox from "../RoundBox";
import styles from "./Modal.module.css";

const ModalContent = ({ children }) => {
    const handleClick = (event) => {
        event.stopPropagation();
    };
    return (
        <RoundBox padding="LG" onClick={handleClick}>
            {children}
        </RoundBox>
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
