import { useMutation } from "@tanstack/react-query";
import CustomButton from "../../../package/customButton/CustomButton";
import CustomInput from "../../../package/CustomInput";
import FileInput from "../../../package/FileInput";
import GridContainer from "../../../package/gridContainer/GridContainer";
import { Vstack } from "../../../package/layout";
import Modal from "../../../package/modal/Modal";
import useLinkUpStore from "../../../shared/store/store";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";

const inputFieldInfoArray = [
    ["아티스트 명", "stage_name", "text"],
    ["그룹 이름", "group_name", "text"],
    ["데뷔일", "debut_date", "date"],
    ["생일", "birthdate", "date"],
];
const fileInputFieldInfoArray = [
    ["얼굴 사진", "img_face", "file"],
    ["상반신 사진", "img_torso", "file"],
    ["배너 사진", "img_banner", "file"],
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
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const postMutation = useMutation({
        mutationFn: (formData) => {
            return axiosReturnsData(
                "POST",
                "/api/companies/artists-with-images",
                formData,
            );
        },
    });
    const putMutation = useMutation({
        mutationFn: ({ body, id }) => {
            return axiosReturnsData(
                "PUT",
                `/api/companies/artists/${id}`,
                body,
            );
        },
    });
    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return axiosReturnsData("DELETE", `/api/companies/artists/${id}`);
        },
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
        // TODO: 여기서 삭제한 걸 로컬 데이터에도 반영해야 한다
        // const newUser = { ...user };
        // newUser.managingArtistArray = newUser.managingArtistArray.filter(
        //     (artist) => artist.id !== selectedArtist.id,
        // );
        // setUser(newUser);
        // handleDismiss();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ event });

        const target = event.target;
        const stage_name = target.stage_name.value;
        const group_name = target.group_name.value;
        const debut_date = target.debut_date.value;
        const birthdate = target.birthdate.value;
        const artist_type = group_name ? "group" : "individual";
        // const parent_group_id = 0;
        // const img_face = target.img_face.value;
        // const img_torso = target.img_torso.value;
        // const img_banner = target.img_banner.value;

        const body = {
            stage_name,
            group_name,
            debut_date,
            birthdate,
            artist_type,
            // parent_group_id,
            email: `${Date.now()}@dont.understand`,
        };
        console.log({ body });
        handleDismiss();

        if (selectedArtist) {
            // HACK: birthdate도 소속사에서 처음부터 받아오면 아래 삭제해야
            if (!birthdate) {
                body.birthdate = "2025-01-01";
            }
            putMutation.mutate({ body, id: selectedArtist.id });
        } else {
            postMutation.mutate(body);
        }

        // const newUser = { ...user };
        // if (!selectedArtist) {
        //     // TODO: POST 요청 보내고서 해당 객체 받아와야
        //     // 그래야 이미지 url 적용하고 id도 스토어에 저정함
        //     newUser.managingArtistArray.push({
        //         id: Date.now(),
        //         ...body,
        //     });
        //     // TODO: 실제로는 store에 추가하기 전에 reponse에 맞게 User 수정해야 함
        // } else {
        //     // TODO: 실제론 PUT 요청도 같이 보내야 함
        //     newUser.managingArtistArray = newUser.managingArtistArray.map(
        //         (el) =>
        //             el.id === selectedArtist.id
        //                 ? { ...selectedArtist, ...body }
        //                 : el,
        //     );
        // }
        // setUser(newUser);
    };

    const buttonLabel = selectedArtist ? "수정" : "추가";

    return (
        <Modal
            isOn={modalKey === "agencySidebar"}
            onBackgroundClick={handleDismiss}
        >
            <form onSubmit={handleSubmit}>
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
                    <FileInput name="img_face" />
                    <FileInput name="img_torso" />
                    <FileInput name="img_banner" />

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
