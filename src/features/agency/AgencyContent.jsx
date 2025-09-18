import { useEffect } from "react";
import Calendar from "../../package/calendar/Calendar";
import { FullScreen, Hstack } from "../../package/layout";
import RoundBox from "../../package/RoundBox";
import useLinkUpStore from "../../shared/store/store";
import AgencyModal from "./AgencyModal";
import AgencySidebar from "./AgencySidebar";
import { dummyEventArray } from "../../shared/store/dummyThepott";

const AgencyContent = () => {
    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setEventArray = useLinkUpStore((state) => state.setEventArray);

    useEffect(() => {
        setEventArray(dummyEventArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FullScreen>
            <AgencyModal />
            <Hstack gap="none">
                <AgencySidebar />
                <RoundBox>
                    <Calendar eventArray={eventArray} />
                </RoundBox>
            </Hstack>
        </FullScreen>
    );
};

export default AgencyContent;
