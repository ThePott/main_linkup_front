import Calendar from "../../package/calendar/Calendar";
import { Hstack } from "../../package/layout";
import Modal from "../../package/modal/Modal";
import RoundBox from "../../package/RoundBox";
import useLinkUpStore from "../../shared/store/store";
import AgencySidebar from "./AgencySidebar";

const AgencyContent = () => {
    const isModalOn = useLinkUpStore((state) => state.isModalOn);
    const setIsModalOn = useLinkUpStore((state) => state.setIsModalOn);
    const selectedArtist = useLinkUpStore((state) => state.selectedArtist);
    return (
        <>
            <Modal
                isOn={isModalOn}
                onBackgroundClick={() => setIsModalOn(false)}
            >
                {JSON.stringify(selectedArtist)}
            </Modal>
            <Hstack gap="none">
                <AgencySidebar />
                <RoundBox>
                    <Calendar />
                </RoundBox>
            </Hstack>
        </>
    );
};

export default AgencyContent;
