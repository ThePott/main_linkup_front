import styles from "./ConfirmationModal.module.css";
import { Vstack } from "../layout";
import Modal from "./Modal";

const ConfirmationModalTitle = ({ children }) => {
    return <p className={styles.title}>{children}</p>;
};
const ConfirmationModalDescription = ({ children }) => {
    return <p className={styles.description}>{children}</p>;
};

const ConfirmationModalTextGroup = ({ children }) => {
    return <Vstack gap="sm">{children}</Vstack>;
};

const ConfirmationModal = ({ isOn, onBackgroundClick, children }) => {
    return (
        <Modal padding="xl" isOn={isOn} onBackgroundClick={onBackgroundClick}>
            <Vstack gap="lg">{children}</Vstack>
        </Modal>
    );
};

ConfirmationModal.TextGroup = ConfirmationModalTextGroup;
ConfirmationModal.Title = ConfirmationModalTitle;
ConfirmationModal.Description = ConfirmationModalDescription;

export default ConfirmationModal;
