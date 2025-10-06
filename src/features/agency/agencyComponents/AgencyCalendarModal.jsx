import styles from "./AgencyCalendarModal.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Hstack, Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import useCompanies from "../../../shared/services/useCompanies";
import { useForm } from "react-hook-form";
import LabelGroup from "../../../package/labelGroup/LabelGroup";
import CustomInput from "../../../package/CustomInput";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../../../shared/validations/zodSchema";
import GridContainer from "../../../package/gridContainer/GridContainer";

// Convert: "2025-11-11T08:31:10.811895Z"
// To: "2025-11-11T08:31"
const convertIsoToDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    return isoString.slice(0, 16); // Takes "YYYY-MM-DDTHH:mm"
};

const makeDefaultValues = (selectedEvent) => {
    const defaultValues = {
        title: selectedEvent?.title || "",
        description: selectedEvent?.description || "",
        startTimeOnlyTime:
            convertIsoToDatetimeLocal(selectedEvent?.start_time).split("T")[1] || "00:00",
        endTimeOnlyTime:
            convertIsoToDatetimeLocal(selectedEvent?.end_time).split("T")[1] || "23:59",
        location: selectedEvent?.location || "",
    };
    return defaultValues;
};

const makeBody = (selectedArtist, selectedEvent, data) => {
    const artistId = selectedArtist.id;
    if (!artistId) {
        throw new Error("---- ERROR OCCURRED: 아티스트가 선택되지 않았습니다");
    }

    const date = selectedEvent.start_time.split("T")[0];

    data.artist_id = artistId;
    data.category = "concert";
    const { startTimeOnlyTime, endTimeOnlyTime, ...rest } = data;

    const body = rest;
    body.start_time = `${date}T${startTimeOnlyTime}`;
    if (endTimeOnlyTime) {
        body.end_time = `${date}T${endTimeOnlyTime}`;
    }

    return body;
};

const AgencyCalendarModal = () => {
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const selectedEvent = useLinkUpStore((state) => state.selectedEvent);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);

    const { eventsPostMutation, eventsPutMutation, eventsDeleteMutation } = useCompanies();

    const defaultValues = useMemo(() => makeDefaultValues(selectedEvent), [selectedEvent]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(eventSchema),
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
        const body = makeBody(selectedArtist, selectedEvent, data);

        const eventId = selectedEvent?.id ?? Date.now();
        const newOne = { id: eventId, ...body };

        if (selectedEvent.id) {
            eventsPutMutation.mutate({ body, newOne });
        } else {
            eventsPostMutation.mutate({ body, newOne });
        }
    };

    return (
        <Modal
            isOn={modalKey === "agencyCalendar"}
            onBackgroundClick={handleDismiss}
            className={styles.container}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Vstack>
                    <Hstack items="end" justify="center">
                        <p className={styles.artistName}>
                            {selectedArtist.stage_name || selectedArtist.group_name}
                        </p>
                        <p className={styles.date}>{selectedEvent.start_time.split("T")[0]}</p>
                    </Hstack>
                    <LabelGroup isRed={errors.title}>
                        <LabelGroup.BigLabel>제목</LabelGroup.BigLabel>
                        <CustomInput {...register("title")} />
                        {errors.title && (
                            <LabelGroup.SmallLabel>{errors.title.message}</LabelGroup.SmallLabel>
                        )}
                    </LabelGroup>
                    <LabelGroup isRed={errors.description}>
                        <LabelGroup.BigLabel>설명</LabelGroup.BigLabel>
                        <CustomInput {...register("description")} />
                        {errors.description && (
                            <LabelGroup.SmallLabel>
                                {errors.description.message}
                            </LabelGroup.SmallLabel>
                        )}
                    </LabelGroup>
                    <GridContainer cols={2}>
                        <LabelGroup isRed={errors.startTimeOnlyTime}>
                            <LabelGroup.BigLabel>시작 시각</LabelGroup.BigLabel>
                            <CustomInput {...register("startTimeOnlyTime")} type="time" />
                            {errors.startTimeOnlyTime && (
                                <LabelGroup.SmallLabel>
                                    {errors.startTimeOnlyTime.message}
                                </LabelGroup.SmallLabel>
                            )}
                        </LabelGroup>
                        <LabelGroup isRed={errors.endTimeOnlyTime}>
                            <LabelGroup.BigLabel>종료 시각</LabelGroup.BigLabel>
                            <CustomInput {...register("endTimeOnlyTime")} type="time" />
                            {errors.endTimeOnlyTime && (
                                <LabelGroup.SmallLabel>
                                    {errors.endTimeOnlyTime.message}
                                </LabelGroup.SmallLabel>
                            )}
                        </LabelGroup>
                    </GridContainer>
                    <LabelGroup isRed={errors.location}>
                        <LabelGroup.BigLabel>장소</LabelGroup.BigLabel>
                        <CustomInput {...register("location")} />
                        {errors.location && (
                            <LabelGroup.SmallLabel>{errors.location.message}</LabelGroup.SmallLabel>
                        )}
                    </LabelGroup>
                    <GridContainer cols={2}>
                        <CustomButton type="button" onClick={handleDelete}>
                            삭제
                        </CustomButton>
                        <CustomButton>제출</CustomButton>
                    </GridContainer>
                </Vstack>
            </form>
        </Modal>
    );
};

export default AgencyCalendarModal;
