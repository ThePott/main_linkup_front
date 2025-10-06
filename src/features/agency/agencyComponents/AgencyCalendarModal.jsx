import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import useCompanies from "../../../shared/services/useCompanies";
import { useForm } from "react-hook-form";
import LabelGroup from "../../../package/labelGroup/LabelGroup";
import CustomInput from "../../../package/CustomInput";

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
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);

    const { eventsPostMutation, eventsPutMutation, eventsDeleteMutation } = useCompanies();

    const { register, handleSubmit } = useForm();

    const handleDismiss = () => {
        setModalKey(null);
    };

    const handleDelete = () => {
        eventsDeleteMutation.mutate({ newOne: selectedEvent });
    };

    const onSubmit = (data) => {
        const artistId = selectedArtist.id;
        if (!artistId) {
            throw new Error("---- ERROR OCCURRED: 아티스트가 선택되지 않았습니다");
        }

        data.artist_id = artistId;
        data.category = "concert";
        const body = data;

        const eventId = selectedEvent?.id ?? Date.now();
        const newOne = { id: eventId, ...data };

        if (selectedEvent.id) {
            eventsPutMutation.mutate({ body, newOne });
        } else {
            eventsPostMutation.mutate({ body, newOne });
        }
    };

    return (
        <Modal isOn={modalKey === "agencyCalendar"} onBackgroundClick={handleDismiss}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Vstack>
                    <LabelGroup>
                        <LabelGroup.BigLabel>제목</LabelGroup.BigLabel>
                        <CustomInput {...register("title")} defaultValue={selectedEvent?.title} />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>설명</LabelGroup.BigLabel>
                        <CustomInput
                            {...register("description")}
                            defaultValue={selectedEvent?.description}
                        />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>시작 시각</LabelGroup.BigLabel>
                        <CustomInput
                            {...register("start_time")}
                            type="datetime-local"
                            defaultValue={convertIsoToDatetimeLocal(selectedEvent?.start_time)}
                        />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>종료 시각</LabelGroup.BigLabel>
                        <CustomInput
                            {...register("end_time")}
                            type="datetime-local"
                            defaultValue={convertIsoToDatetimeLocal(selectedEvent?.end_time)}
                        />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>장소</LabelGroup.BigLabel>
                        <CustomInput
                            {...register("location")}
                            defaultValue={selectedEvent?.location}
                        />
                    </LabelGroup>
                    <CustomButton>제출</CustomButton>
                    <CustomButton type="button" onClick={handleDelete}>
                        삭제
                    </CustomButton>
                </Vstack>
            </form>
        </Modal>
    );
};

export default AgencyCalendarModal;
