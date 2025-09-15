import CustomButton from "../../package/customButton/CustomButton";
import CustomInput from "../../package/CustomInput";
import { Vstack } from "../../package/layout";
import Modal from "../../package/modal/Modal";
import useLinkUpStore from "../../shared/store/store";

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
        console.log({ event });
        debugger;
        handleDismiss();
    };

    const buttonLabel = selectedArtist ? "수정" : "추가";

    return (
        <Modal isOn={isModalOn} onBackgroundClick={handleDismiss}>
            <form onSubmit={handleSubmit}>
                <Vstack>
                    <CustomInput
                        name="artistName"
                        placeholder="아티스트 명"
                        defaultValue={
                            selectedArtist ? selectedArtist.name : undefined
                        }
                    />
                    <CustomInput
                        name="debut_date"
                        type="date"
                        defaultValue={
                            selectedArtist
                                ? selectedArtist.debut_date
                                : undefined
                        }
                    />
                    <CustomInput
                        name="birthdate"
                        type="date"
                        defaultValue={
                            selectedArtist
                                ? selectedArtist.birthdate
                                : undefined
                        }
                    />
                    <CustomInput
                        name="img_face"
                        type="file"
                        defaultValue={
                            selectedArtist ? selectedArtist.img_face : undefined
                        }
                    />
                    <CustomInput
                        name="img_torso"
                        type="file"
                        defaultValue={
                            selectedArtist
                                ? selectedArtist.img_torso
                                : undefined
                        }
                    />
                    <CustomInput
                        name="img_banner"
                        type="file"
                        defaultValue={
                            selectedArtist
                                ? selectedArtist.img_banner
                                : undefined
                        }
                    />
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
