import Calendar from "../../../package/calendar/Calendar";
import CustomButton from "../../../package/customButton/CustomButton";
import RoundBox from "../../../package/RoundBox";
import { BulkDownloadButton } from "../../../shared/ArtistCalendar/AdditionalCalendarButtons";
import useLinkUpStore from "../../../shared/store/store";
import styles from "./AgencyCalendar.module.css";
import AgencyCalendarModal from "./AgencyCalendarModal";
import UploadModal from "./UploadModal";

const UploadButton = () => {
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const handleClick = () => {
        setModalKey("upload");
    };
    return <CustomButton onClick={handleClick}>업로드</CustomButton>;
};

const AgencyCalendar = () => {
    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const setSelectedEvent = useLinkUpStore((state) => state.setSelectedEvent);

    return (
        <>
            <AgencyCalendarModal />
            <UploadModal />
            <RoundBox className={styles.agencyRoundBoxForCalender}>
                <Calendar
                    eventArray={eventArray}
                    setModalKey={setModalKey}
                    setSelectedEvent={setSelectedEvent}
                    additionalButtonArray={[<BulkDownloadButton />, <UploadButton />]}
                />
            </RoundBox>
        </>
    );
};

export default AgencyCalendar;
