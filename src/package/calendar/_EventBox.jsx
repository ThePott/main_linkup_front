import styles from "./calendar.module.css";
import { useCalendarContext } from "./CalendarContext";

const EventBox = ({ event }) => {
    const { setModalKey, setSelectedEvent } = useCalendarContext();
    const { id, start_time, end_time, title, subjectId, subjectName } = event;

    const handleClick = () => {
        setSelectedEvent(event);
    };

    const handleDoubleClick = (mouseEvent) => {
        mouseEvent.stopPropagation();
        setSelectedEvent(event);
        setModalKey("agencyCalendar");
    };
    return (
        <div
            className={styles.eventBox}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            {title}
        </div>
    );
};

export default EventBox;
