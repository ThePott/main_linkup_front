import styles from "./_EventBox.module.css";
import { useCalendarContext } from "./CalendarContext";

export const EventDot = ({ isDim }) => {
    const styleForVar = {};
    styleForVar["--bg"] = isDim ? "var(--color-muted)" : "var(--color-vivid)";

    return <div style={styleForVar} className={styles.eventDot} />;
};

const EventBox = ({ event, isDim }) => {
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

    const styleForVar = {};
    styleForVar["--bg"] = isDim ? "var(--color-muted)" : "var(--color-vivid)";

    return (
        <div
            style={styleForVar}
            className={styles.eventBox}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            {title}
        </div>
    );
};

export default EventBox;
