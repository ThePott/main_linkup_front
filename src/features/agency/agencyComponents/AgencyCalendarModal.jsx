import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";

// Convert: "2025-11-11T08:31:10.811895Z"
// To: "2025-11-11T08:31"
const convertIsoToDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    return isoString.slice(0, 16); // Takes "YYYY-MM-DDTHH:mm"
};

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
                        inputProps={{
                            type: "datetime-local",
                            defaultValue: convertIsoToDatetimeLocal(
                                selectedEvent?.start_time,
                            ),
                        }}
                    />
                    <CustomInputLabeled
                        label="종료 시각"
                        inputProps={{
                            type: "datetime-local",
                            defaultValue: convertIsoToDatetimeLocal(
                                selectedEvent?.end_time,
                            ),
                        }}
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
