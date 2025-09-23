import { useMutation } from "@tanstack/react-query";
import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";

// Convert: "2025-11-11T08:31:10.811895Z"
// To: "2025-11-11T08:31"
const convertIsoToDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    return isoString.slice(0, 16); // Takes "YYYY-MM-DDTHH:mm"
};

// HACK: 기능 구현 되면 이 부분 삭제해야 함
const DebugButtonToPopulateForm = () => {
    const setSelectedEvent = useLinkUpStore((state) => state.setSelectedEvent);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);

    const handleClick = () => {
        const body = {
            artist_id: selectedArtist.id,
            title: "엄청난 콘서트",
            category: "콘서트",
            description:
                "데뷔 5주년 기념 콘서트를 개최합니다. 모두들 함께 하세요!",
            location: "서울 잠실 어딘가 좋은 곳",
        };
        setSelectedEvent((prev) => ({ ...prev, ...body }));
    };
    return (
        <CustomButton isOn={true} handleClick={handleClick}>
            DEBUG
        </CustomButton>
    );
};

const AgencyCalendarModal = () => {
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const selectedEvent = useLinkUpStore((state) => state.selectedEvent);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);

    const postMutation = useMutation({
        mutationFn: (body) =>
            axiosReturnsData("POST", `/api/companies/events`, body),
    });
    const putMutation = useMutation({
        mutationFn: ({ body, id }) =>
            axiosReturnsData("PUT", `/api/companies/events/${id}`, body),
    });
    const deleteMutation = useMutation({
        mutationFn: (id) =>
            axiosReturnsData("DELETE", `/api/companies/events/${id}`),
    });

    const handleDismiss = () => {
        setModalKey(null);
    };

    const handleSubmit = (formEvent) => {
        formEvent.preventDefault();
        const target = formEvent.target;
        const title = target.title.value;
        const category = target.category.value;
        const description = target.description.value;
        const start_time = target.start_time.value;
        const end_time = target.end_time.value;
        const location = target.location.value;

        const body = {
            artist_id: selectedArtist.id,
            title,
            category,
            description,
            start_time,
            end_time,
            location,
        };
        console.log({ body });

        const eventId = selectedEvent.id;
        if (eventId) {
            putMutation.mutate({ body, id: eventId });
        } else {
            postMutation.mutate(body);
        }
        handleDismiss();
    };

    return (
        <Modal
            isOn={modalKey === "agencyCalendar"}
            onBackgroundClick={handleDismiss}
        >
            <DebugButtonToPopulateForm />
            <form onSubmit={handleSubmit}>
                <Vstack>
                    <CustomInputLabeled
                        label="제목"
                        inputProps={{
                            name: "title",
                            defaultValue: selectedEvent?.title,
                        }}
                    />
                    <CustomInputLabeled
                        label="카테고리"
                        inputProps={{
                            name: "category",
                            defaultValue: selectedEvent?.category,
                        }}
                    />
                    <CustomInputLabeled
                        label="설명"
                        inputProps={{
                            name: "description",
                            defaultValue: selectedEvent?.description,
                        }}
                    />
                    <CustomInputLabeled
                        label="시작 시각"
                        inputProps={{
                            name: "start_time",
                            type: "datetime-local",
                            defaultValue: convertIsoToDatetimeLocal(
                                selectedEvent?.start_time,
                            ),
                        }}
                    />
                    <CustomInputLabeled
                        label="종료 시각"
                        inputProps={{
                            name: "end_time",
                            type: "datetime-local",
                            defaultValue: convertIsoToDatetimeLocal(
                                selectedEvent?.end_time,
                            ),
                        }}
                    />
                    <CustomInputLabeled
                        label="장소"
                        inputProps={{
                            name: "location",
                            defaultValue: selectedEvent?.location,
                        }}
                    />
                    <CustomButton>제출</CustomButton>
                </Vstack>
            </form>
            <CustomButton
                onClick={() => deleteMutation.mutate(selectedEvent?.id ?? -1)}
            >
                삭제
            </CustomButton>
        </Modal>
    );
};

export default AgencyCalendarModal;
