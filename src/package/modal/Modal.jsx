import styles from "./Modal.module.css";

const TempRoundBox = ({ children }) => {
    return (
        <div
            style={{
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "var(--color-bg)",

                minWidth: "500px",
                maxWidth: "800px",
                maxHeight: "800px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    );
};

const Backdrop = ({ onBackgroundClick, children }) => {
    return (
        <div onClick={onBackgroundClick} className={styles.backdrop}>
            <TempRoundBox>{children}</TempRoundBox>
        </div>
    );
};

const Modal = ({ isOn, onBackgroundClick, children }) => {
    if (!isOn) {
        return null;
    }
    return (
        <Backdrop onBackgroundClick={onBackgroundClick}>{children}</Backdrop>
    );
};

export default Modal;
