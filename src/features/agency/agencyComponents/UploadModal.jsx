import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";

const UploadModal = () => {
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    if (!selectedArtist) {
        return null;
    }

    return (
        <Modal isOn={modalKey === "upload"} onBackgroundClick={() => setModalKey(null)}>
            <Vstack gap="xl">
                <CustomButton>템플릿 다운로드</CustomButton>
                <CustomInputLabeled
                    inputProps={{ name: "upload", type: "file" }}
                    label={`${selectedArtist.stage_name || selectedArtist.group_name} 일정 업로드`}
                />
                <CustomButton>업로드</CustomButton>
            </Vstack>
        </Modal>
    );
};

export default UploadModal;
