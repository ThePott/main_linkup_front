import { useMutation } from "@tanstack/react-query";
import CustomButton from "../../../package/customButton/CustomButton";
import CustomInputLabeled from "../../../package/CustomInputLabeled";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import axiosInstance, { axiosDownloadFile } from "../../../shared/services/axiosInstance";
import useLinkUpStore from "../../../shared/store/store";
import { useState } from "react";

const UploadModal = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);

    const postMutation = useMutation({
        mutationFn: ({ url, formData }) => axiosInstance.post(url, formData),
        onMutate: () => {
            setIsPending(true);
        },
        onSuccess: () => {
            setError(null);
            setModalKey(null);
        },
        onError: (error) => {
            setError(error);
        },
        onSettled: () => {
            setIsPending(false);
        },
    });

    if (!selectedArtist) {
        return null;
    }

    const handleTemplateDownload = () => {
        const url = "/api/companies/artists/upload-template";
        axiosDownloadFile(url);
    };

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            const url = `/api/companies/artists/${selectedArtist.id}/upload-all`;

            const formData = new FormData(event.target);
            postMutation.mutate({ url, formData });
        } catch (error) {
            console.error(error);
            debugger;
        }
    };

    const uploadButtonLabel = isPending ? "... 업로드 중이에요 ..." : "업로드";

    return (
        <Modal isOn={modalKey === "upload"} onBackgroundClick={() => setModalKey(null)}>
            <form onSubmit={handleSubmit}>
                <Vstack gap="xl">
                    <CustomButton type="button" onClick={handleTemplateDownload}>
                        템플릿 다운로드
                    </CustomButton>
                    <CustomInputLabeled
                        inputProps={{ name: "file", type: "file" }}
                        label={`${selectedArtist.stage_name || selectedArtist.group_name} 일정 업로드`}
                    />
                    <CustomButton>{uploadButtonLabel}</CustomButton>
                    {error && <div>업로드에 실패했어요</div>}
                </Vstack>
            </form>
        </Modal>
    );
};

export default UploadModal;
