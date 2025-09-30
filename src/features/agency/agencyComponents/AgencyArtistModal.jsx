import styles from "./AgencyArtistModal.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import CustomInput from "../../../package/CustomInput";
import GridContainer from "../../../package/gridContainer/GridContainer";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import useAgentArtistModal from "../agencyServices/useAgencyArtistModal";
import { useRef } from "react";
import ImageInput from "../../../package/imageInput/ImageInput";

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

const DebugButton = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const handleClick = () => {
        console.log({ selectedArtist });
    };
    return <CustomButton onClick={handleClick}>DEBUG</CustomButton>;
};

const AgencyArtistModal = () => {
    const formRef = useRef(null);

    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const { isPending, error, postMutation, putMutation, deleteMutation } = useAgentArtistModal();

    const dismiss = () => {
        setModalKey(null);
    };

    const handleDelete = () => {
        if (!selectedArtist) {
            throw new Error("---- ERROR OCCURRED: 유저 혹은 아티스트가 없는데 삭제를 하려 함");
        }

        deleteMutation.mutate(selectedArtist.id);
        dismiss();
        // TODO: 삭제한 걸 로컬에도 반영해야 한다
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        // Override computed field
        const artist_type = formData.get("group_name") ? "group" : "individual";
        formData.set("artist_type", artist_type);

        if (selectedArtist) {
            formData.append("id", selectedArtist.id);
            putMutation.mutate(formData);
        } else {
            postMutation.mutate(formData);
        }

        // TODO: POST or PUT 요청 보내고서 로컬에도 반영해야 함
        dismiss();
    };

    const buttonLabel = selectedArtist ? "수정" : "추가";

    return (
        <Modal
            className={styles.modal}
            isOn={modalKey === "agencySidebar"}
            onBackgroundClick={dismiss}
        >
            <form ref={formRef} onSubmit={handleSubmit}>
                <GridContainer gap="MD" cols={4}>
                    <Vstack>
                        {inputFieldInfoArray.map((info) => (
                            <ArtistInput key={info} selectedArtist={selectedArtist} info={info} />
                        ))}
                    </Vstack>
                    <ImageInput name="face_image" defaultSrc={selectedArtist?.face_url} />
                    <ImageInput name="torso_image" defaultSrc={selectedArtist?.torso_url} />
                    <ImageInput name="banner_image" defaultSrc={selectedArtist?.banner_url} />

                    <CustomButton type="submit">{buttonLabel}</CustomButton>
                    {selectedArtist && (
                        <CustomButton type="button" onClick={handleDelete}>
                            삭제
                        </CustomButton>
                    )}
                </GridContainer>
            </form>
            <DebugButton />
        </Modal>
    );
};

export default AgencyArtistModal;
