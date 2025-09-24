import Calendar from "../../../package/calendar/Calendar";
import RoundBox from "../../../package/RoundBox";
import useLinkUpStore from "../../../shared/store/store";
import useAgencyCalendar from "../agencyServices/useAgencyCalendar";
import styles from "./AgencyCalendar.module.css";
import AgencyCalendarModal from "./AgencyCalendarModal";

const AgencyCalendar = () => {
    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedEvent = useLinkUpStore((state) => state.setSelectedEvent);

    const { isPending, error } = useAgencyCalendar();
    return (
        <>
            <AgencyCalendarModal />
            <RoundBox className={styles.agencyRoundBoxForCalender}>
                <Calendar
                    eventArray={eventArray}
                    setModalKey={setModalKey}
                    setSelectedEvent={setSelectedEvent}
                />
            </RoundBox>
        </>
    );
};

export default AgencyCalendar;
