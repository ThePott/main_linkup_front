import CustomButton from "../../package/customButton/CustomButton";
import CustomInput from "../../package/CustomInput";
import Modal from "../../package/modal/Modal";
import useLinkUpStore from "../../shared/store/store";

const ModalArtist = () => {
    const isModalOn = useLinkUpStore((state) => state.isModalOn);
    const setIsModalOn = useLinkUpStore((state) => state.setIsModalOn);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    const user = useLinkUpStore((state) => state.user);
    const setUser = useLinkUpStore((state) => state.setUser);

    const handleDelete = (event) => {
        event.preventDefault();
        event.stopPropagation();
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
    };
    if (!selectedArtist) {
        return null;
    }
    return (
        <Modal isOn={isModalOn} onBackgroundClick={() => setIsModalOn(false)}>
            <CustomInput
                placeholder="아티스트 명"
                style={{ width: "100%" }}
                defaultValue={selectedArtist ? selectedArtist.name : undefined}
            />
            <p>데뷔일: {selectedArtist.debut_date.toString()}</p>
            <p>생일: {selectedArtist.birthdate.toString()}</p>
            <CustomButton onClick={handleDelete}>삭제</CustomButton>
        </Modal>
    );
};

export default ModalArtist;
