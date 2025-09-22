import Calendar from "../../../package/calendar/Calendar";
import RoundBox from "../../../package/RoundBox";
import useLinkUpStore from "../../../shared/store/store";
import { useAgencyCalendar } from "../agencyServices/useAgency";
import styles from "./AgencyCalendar.module.css";

const AgencyCalendar = () => {
    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setEventArray = useLinkUpStore((state) => state.setEventArray);
    const { isPEnding, error } = useAgencyCalendar();
    return (
        <RoundBox className={styles.agencyRoundBoxForCalender}>
            <Calendar eventArray={eventArray} />
        </RoundBox>
    );
};

export default AgencyCalendar;
