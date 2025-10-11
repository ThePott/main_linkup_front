import styles from "./AgencyArtistModal.module.css";
import CustomButton from "../../../package/customButton/CustomButton";
import CustomInput from "../../../package/CustomInput";
import GridContainer from "../../../package/gridContainer/GridContainer";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import { useRef } from "react";
import ImageInput from "../../../package/imageInput/ImageInput";
import useCompanies from "../../../shared/services/useCompanies";
import { convertFormDataToArtist } from "../../../shared/utils/formUtils";

const inputFieldInfoArray = [
    ["아티스트 명", "stage_name", "text"],
    ["그룹 이름", "group_name", "text"],
    ["데뷔일", "debut_date", "date"],
    ["생일", "birth_date", "date"],
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

    const { artistsPostMutation, artistsPutMutation, artistsDeleteMutation } = useCompanies();

    const dismiss = () => {
        setModalKey(null);
    };

    const handleDelete = () => {
        if (!selectedArtist) {
            throw new Error("---- ERROR OCCURRED: 유저 혹은 아티스트가 없는데 삭제를 하려 함");
        }

        artistsDeleteMutation.mutate({ newOne: selectedArtist });
        dismiss();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const artist_type = formData.get("group_name") ? "group" : "individual";
        formData.append("artist_type", artist_type);

        const artist = convertFormDataToArtist(formData);
        const newOne = { id: Date.now(), ...artist };

        if (selectedArtist) {
            formData.append("id", selectedArtist.id);
            artistsPutMutation.mutate({ body: formData, newOne });
        } else {
            artistsPostMutation.mutate({ body: formData, newOne });
        }

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
                <GridContainer gap="MD" cols={4} rows={1}>
                    <Vstack>
                        {inputFieldInfoArray.map((info) => (
                            <ArtistInput key={info} selectedArtist={selectedArtist} info={info} />
                        ))}
                    </Vstack>
                    <ImageInput
                        className={styles.imageInput}
                        name="face_image"
                        defaultSrc={selectedArtist?.face_url}
                    />
                    <ImageInput
                        className={styles.imageInput}
                        name="torso_image"
                        defaultSrc={selectedArtist?.torso_url}
                    />
                    <ImageInput
                        className={styles.imageInput}
                        name="banner_image"
                        defaultSrc={selectedArtist?.banner_url}
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
