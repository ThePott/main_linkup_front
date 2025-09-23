import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";

const AgencyCalendarModal = () => {
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const handleDismiss = () => {
        setModalKey(null);
    };
    console.log({ modalKey });
    return (
        <Modal
            isOn={modalKey === "agencyCalendar"}
            onBackgroundClick={handleDismiss}
        >
            <p>여기에 아무거나 적기</p>
        </Modal>
    );
};

export default AgencyCalendarModal;
