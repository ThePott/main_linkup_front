import styles from "./AgencyArtistModal.module.css";
import { useMutation } from "@tanstack/react-query";
import CustomButton from "../../../package/customButton/CustomButton";
import CustomInput from "../../../package/CustomInput";
import GridContainer from "../../../package/gridContainer/GridContainer";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import { useAgentArtistModal } from "../agencyServices/useAgency";
import { useRef } from "react";
import ImageInput from "../../../package/imageInput/ImageInput";
import RoundBox from "../../../package/RoundBox";

const inputFieldInfoArray = [
    ["아티스트 명", "stage_name", "text"],
    ["그룹 이름", "group_name", "text"],
    ["데뷔일", "debut_date", "date"],
    ["생일", "birth_date", "date"],
];
const fileInputFieldInfoArray = [
    ["얼굴 사진", "face_image", "file"],
    ["상반신 사진", "torso_image", "file"],
    ["배너 사진", "banner_image", "file"],
];

const makeDefaultValue = (selectedArtist, info) => {
    if (!selectedArtist) {
        return undefined;
    }

    const artistProp = selectedArtist[info[1]];
    return artistProp ?? undefined;
};

const ArtistInput = ({ selectedArtist, info }) => {
    return (
        <Vstack gap="none">
            <p>{info[0]}</p>
            <CustomInput
                name={info[1]}
                type={info[2]}
                defaultValue={makeDefaultValue(selectedArtist, info)}
            />
        </Vstack>
    );
};

const AgencyArtistModal = () => {
    const formRef = useRef(null);

    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const addArtistInTemp = useLinkUpStore((state) => state.addArtistInTemp);
    const addArtistInReal = useLinkUpStore((state) => state.addArtistInReal);

    const updateArtistInTemp = useLinkUpStore(
        (state) => state.updateArtistInTemp,
    );
    const deleteArtist = useLinkUpStore((state) => state.deleteArtist);

    const { isPending, error } = useAgentArtistModal();

    const postMutation = useMutation({
        mutationFn: (formData) =>
            axiosReturnsData(
                "POST",
                "/api/companies/artists/with-images",
                formData,
            ),
        onMutate: (formData) => {
            addArtistInTemp(formData);
        },
        onSuccess: (data) => addArtistInReal(data),
    });
    const putMutation = useMutation({
        mutationFn: async ({ body, id }) =>
            axiosReturnsData(
                "PUT",
                `/api/companies/artists/with-images/${id}`,
                body,
            ),
        onMutate: ({ id, body }) => {
            updateArtistInTemp(id, body);
        },
    });
    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return axiosReturnsData("DELETE", `/api/companies/artists/${id}`);
        },
        onMutate: (id) => deleteArtist(id),
    });

    const handleDismiss = () => {
        setModalKey(null);
    };

    const handleDelete = () => {
        if (!selectedArtist) {
            throw new Error(
                "---- ERROR OCCURRED: 유저 혹은 아티스트가 없는데 삭제를 하려 함",
            );
        }

        deleteMutation.mutate(selectedArtist.id);
        // TODO: 삭제한 걸 로컬에도 반영해야 한다
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ event });

        const target = event.target;
        const stage_name = target.stage_name.value;
        const group_name = target.group_name.value;
        const debut_date = target.debut_date.value;
        const birth_date = target.birth_date.value;
        const artist_type = group_name ? "group" : "individual";

        // Get actual File objects instead of values
        const face_image = target.face_image.files[0];
        const torso_image = target.torso_image.files[0];
        const banner_image = target.banner_image.files[0];

        const formData = new FormData();
        formData.append("stage_name", stage_name);
        formData.append("group_name", group_name);
        formData.append("debut_date", debut_date);
        formData.append("birth_date", birth_date);
        formData.append("artist_type", artist_type);

        // Append files if they exist
        if (face_image) formData.append("face_image", face_image);
        if (torso_image) formData.append("torso_image", torso_image);
        if (banner_image) formData.append("banner_image", banner_image);

        if (selectedArtist) {
            putMutation.mutate({ body: formData, id: selectedArtist.id });
        } else {
            postMutation.mutate(formData);
        }

        // TODO: POST or PUT 요청 보내고서 로컬에도 반영해야 함
        handleDismiss();
    };

    const buttonLabel = selectedArtist ? "수정" : "추가";

    return (
        <Modal
            className={styles.modal}
            isOn={modalKey === "agencySidebar"}
            onBackgroundClick={handleDismiss}
        >
            <RoundBox>{selectedArtist?.id ?? "null"}</RoundBox>
            <form ref={formRef} onSubmit={handleSubmit}>
                <GridContainer gap="MD" cols={4}>
                    <Vstack>
                        {inputFieldInfoArray.map((info) => (
                            <ArtistInput
                                key={info}
                                selectedArtist={selectedArtist}
                                info={info}
                            />
                        ))}
                    </Vstack>
                    <ImageInput
                        name="face_image"
                        defaultSrc={selectedArtist?.face_image}
                    />
                    <ImageInput
                        name="torso_image"
                        defaultSrc={selectedArtist?.torso_image}
                    />
                    <ImageInput
                        name="banner_image"
                        defaultSrc={selectedArtist?.banner_image}
                    />

                    <CustomButton type="submit">{buttonLabel}</CustomButton>
                    {selectedArtist && (
                        <CustomButton type="button" onClick={handleDelete}>
                            삭제
                        </CustomButton>
                    )}
                </GridContainer>
            </form>
        </Modal>
    );
};

export default AgencyArtistModal;
