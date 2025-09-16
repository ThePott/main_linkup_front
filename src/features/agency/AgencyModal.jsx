import CustomButton from "../../package/customButton/CustomButton";
import CustomInput from "../../package/CustomInput";
import { Vstack } from "../../package/layout";
import Modal from "../../package/modal/Modal";
import useLinkUpStore from "../../shared/store/store";
import { format } from "date-fns";

const inputFieldInfoArray = [
    ["아티스트 명", "artistName", "text", "name"],
    ["데뷔일", "debut_date", "date", "debut_date"],
    ["생일", "birthdate", "date", "birthdate"],
    ["얼굴 사진", "img_face", "file", "img_face"],
    ["상반신 사진", "img_torso", "file", "img_torso"],
    ["배너 사진", "img_banner", "file", "img_banner"],
];

const ArtistInput = ({ selectedArtist, info }) => {
    return (
        <Vstack gap="none">
            <p>{info[0]}</p>
            <CustomInput
                name={info[1]}
                type={info[2]}
                defaultValue={
                    selectedArtist
                        ? info[2] === "date"
                            ? format(selectedArtist[info[3]], "yyyy-MM-dd")
                            : selectedArtist[info[3]]
                        : undefined
                }
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
        const debut_date = target.debut_date.value;
        const birthdate = target.birthdate.value;
        const img_face = target.img_face.value;
        const img_torso = target.img_torso.value;
        const img_banner = target.img_banner.value;

        console.log({
            name,
            debut_date,
            birthdate,
            img_face,
            img_torso,
            img_banner,
        });
        debugger;
        handleDismiss();
    };

    const buttonLabel = selectedArtist ? "수정" : "추가";

    return (
        <Modal isOn={isModalOn} onBackgroundClick={handleDismiss}>
            <form onSubmit={handleSubmit}>
                <Vstack>
                    {inputFieldInfoArray.map((info) => (
                        <ArtistInput
                            selectedArtist={selectedArtist}
                            info={info}
                        />
                    ))}
                    <CustomButton>{buttonLabel}</CustomButton>
                    {selectedArtist && (
                        <CustomButton onClick={handleDelete}>삭제</CustomButton>
                    )}
                </Vstack>
            </form>
        </Modal>
    );
};

export default AgencyModal;
