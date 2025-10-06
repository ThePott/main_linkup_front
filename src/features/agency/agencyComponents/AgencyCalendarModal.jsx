import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import useCompanies from "../../../shared/services/useCompanies";
import { useForm } from "react-hook-form";
import LabelGroup from "../../../package/labelGroup/LabelGroup";
import CustomInput from "../../../package/CustomInput";
import { useEffect } from "react";

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

    const defaultValues = {
        title: selectedEvent?.title || "",
        description: selectedEvent?.description || "",
        start_time: convertIsoToDatetimeLocal(selectedEvent?.start_time),
        end_time: convertIsoToDatetimeLocal(selectedEvent?.end_time),
        location: selectedEvent?.location || "",
    };

    const { register, handleSubmit, reset } = useForm({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalKey, selectedEvent]);

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
        const { startTimeOnlyTime, endTimeOnlyTime, start_time, ...rest } = data;

        const body = rest;
        const date = start_time.split("T")[0];
        body.start_time = `${date}T${startTimeOnlyTime}`;
        if (endTimeOnlyTime) {
            body.end_time = `${date}T${endTimeOnlyTime}`;
        }

        debugger;

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
                        <CustomInput {...register("title")} />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>설명</LabelGroup.BigLabel>
                        <CustomInput {...register("description")} />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>시작 시각</LabelGroup.BigLabel>
                        <CustomInput {...register("startTimeOnlyTime")} type="time" />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>종료 시각(선택)</LabelGroup.BigLabel>
                        <CustomInput {...register("endTimeOnlyTime")} type="time" />
                    </LabelGroup>
                    <LabelGroup>
                        <LabelGroup.BigLabel>장소</LabelGroup.BigLabel>
                        <CustomInput {...register("location")} />
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
