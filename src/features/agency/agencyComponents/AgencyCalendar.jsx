import Calendar from "../../../package/calendar/Calendar";
import RoundBox from "../../../package/RoundBox";
import useLinkUpStore from "../../../shared/store/store";
import styles from "./AgencyCalendar.module.css";

const AgencyCalendar = () => {
    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setEventArray = useLinkUpStore((state) => state.setEventArray);
    return (
        <RoundBox className={styles.agencyRoundBoxForCalender}>
            <Calendar eventArray={eventArray} />
        </RoundBox>
    );
};

export default AgencyCalendar;
