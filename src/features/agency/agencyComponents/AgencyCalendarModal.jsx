import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";

const AgencyCalendarModal = () => {
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const selectedEvent = useLinkUpStore((state) => state.selectedEvent);

    const handleDismiss = () => {
        setModalKey(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Modal
            isOn={modalKey === "agencyCalendar"}
            onBackgroundClick={handleDismiss}
        >
            <form onSubmit={handleSubmit}>
                <Vstack>
                    <CustomInputLabeled
                        label="제목"
                        inputProps={{ defaultValue: selectedEvent?.title }}
                    />
                    <CustomInputLabeled
                        label="설명"
                        inputProps={{
                            defaultValue: selectedEvent?.description,
                        }}
                    />
                    <CustomInputLabeled
                        label="시작 시각"
                        inputProps={{ defaultValue: selectedEvent?.start_time }}
                    />
                    <CustomInputLabeled
                        label="종료 시각"
                        inputProps={{ defaultValue: selectedEvent?.end_time }}
                    />
                    <CustomInputLabeled
                        label="장소"
                        inputProps={{ defaultValue: selectedEvent?.location }}
                    />
                    <CustomButton>제출</CustomButton>
                </Vstack>
            </form>
        </Modal>
    );
};

export default AgencyCalendarModal;
