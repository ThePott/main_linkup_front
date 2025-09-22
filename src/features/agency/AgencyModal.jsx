import CustomButton from "../../package/customButton/CustomButton";
import CustomInput from "../../package/CustomInput";
import FileInput from "../../package/FileInput";
import GridContainer from "../../package/gridContainer/GridContainer";
import { Vstack } from "../../package/layout";
import Modal from "../../package/modal/Modal";
import useLinkUpStore from "../../shared/store/store";

const inputFieldInfoArray = [
    ["아티스트 명", "artistName", "text", "name"],
    ["그룹 이름", "group_name", "text", "group_name"],
    ["데뷔일", "debut_date", "date", "debut_date"],
    ["생일", "birthdate", "date", "birthdate"],
];
const fileInputFieldInfoArray = [
    ["얼굴 사진", "img_face", "file", "img_face"],
    ["상반신 사진", "img_torso", "file", "img_torso"],
    ["배너 사진", "img_banner", "file", "img_banner"],
];

const makeDefaultValue = (selectedArtist, info) => {
    if (!selectedArtist) {
        return undefined;
    }

    const artistProp = selectedArtist[info[3]];

    if (info[2] !== "date") {
        return artistProp;
    }

    const ymdForInput = `${artistProp.slice(0, 4)}-${artistProp.slice(4, 6)}-${artistProp.slice(6, 8)}`;
    return ymdForInput;
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

const AgencyModal = () => {
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const isModalOn = useLinkUpStore((state) => state.isModalOn);
    const setIsModalOn = useLinkUpStore((state) => state.setIsModalOn);
    const setSelectedArtist = useLinkUpStore(
        (state) => state.setSelectedArtist,
    );

    const user = useLinkUpStore((state) => state.user);
    const setUser = useLinkUpStore((state) => state.setUser);

    const handleDismiss = () => {
        setSelectedArtist(null);
        setIsModalOn(false);
    };

    const handleDelete = () => {
        if (!user || !selectedArtist) {
            throw new Error(
                "---- ERROR OCCURRED: 유저 혹은 아티스트가 없는데 삭제를 하려 함",
            );
        }

        const newUser = { ...user };
        newUser.managingArtistArray = newUser.managingArtistArray.filter(
            (artist) => artist.id !== selectedArtist.id,
        );
        setUser(newUser);
        handleDismiss();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ event });

        const target = event.target;
        const name = target.artistName.value;
        const group_name = target.group_name.value;
        const debut_date = target.debut_date.value;
        const birthdate = target.birthdate.value;
        // const img_face = target.img_face.value;
        // const img_torso = target.img_torso.value;
        // const img_banner = target.img_banner.value;

        const groupInfo = group_name
            ? { is_group: true, group_name }
            : { is_group: false, group_name: undefined };

        const body = {
            name,
            ...groupInfo,
            debut_date,
            birthdate,
            // img_face,
            // img_torso,
            // img_banner,
        };
        console.log({ body });
        handleDismiss();

        const newUser = { ...user };
        if (!selectedArtist) {
            // TODO: POST 요청 보내고서 해당 객체 받아와야
            // 그래야 이미지 url 적용하고 id도 스토어에 저정함
            newUser.managingArtistArray.push({
                id: Date.now(),
                ...body,
            });
            // TODO: 실제로는 store에 추가하기 전에 reponse에 맞게 User 수정해야 함
        } else {
            // TODO: 실제론 PUT 요청도 같이 보내야 함
            newUser.managingArtistArray = newUser.managingArtistArray.map(
                (el) =>
                    el.id === selectedArtist.id
                        ? { ...selectedArtist, ...body }
                        : el,
            );
        }
        setUser(newUser);
    };

    const buttonLabel = selectedArtist ? "수정" : "추가";

    return (
        <Modal isOn={isModalOn} onBackgroundClick={handleDismiss}>
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

export default AgencyModal;
