import Calendar from "../../package/calendar/Calendar";
import { Hstack } from "../../package/layout";
import RoundBox from "../../package/RoundBox";
import AgencyModal from "./AgencyModal";
import AgencySidebar from "./AgencySidebar";

const AgencyContent = () => {
    return (
        <>
            <AgencyModal />
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
