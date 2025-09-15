import Calendar from "../../package/calendar/Calendar";
import { Hstack } from "../../package/layout";
import RoundBox from "../../package/RoundBox";
import AgencySidebar from "./AgencySidebar";
import ModalArtist from "./ModalArtist";

const AgencyContent = () => {
    return (
        <>
            <ModalArtist />
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
