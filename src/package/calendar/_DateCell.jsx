import { format } from "date-fns";
import { Hstack, Vstack } from "../layout";
import EventBox, { EventDot } from "./_EventBox";
import styles from "./_DateCell.module.css";
import { useCalendarContext } from "./CalendarContext";

const getColorVar = (dayType, isDim) => {
    const colorVarArray = ["--color"];
    switch (dayType) {
        case "BUSINESS_DAY":
            break;
        case "SATURDAY":
            colorVarArray.push("-blue");
            break;
        case "SUNDAY":
            colorVarArray.push("-red");
            break;
    }
    if (isDim) {
        colorVarArray.push("-muted");
    }
    if (colorVarArray.length === 1) {
        colorVarArray.push("-vivid");
    }

    const colorVar = colorVarArray.join("");

    return colorVar;
};

const getDayType = (date) => {
    const day = date.getDay();
    switch (day) {
        case 0:
            return "SUNDAY";
        case 6:
            return "SATURDAY";
        default:
            return "BUSINESS_DAY";
    }
};

const getDayTypeFromKorean = (weekday) => {
    switch (weekday) {
        case "일":
            return "SUNDAY";
        case "토":
            return "SATURDAY";
        default:
            return "BUSINESS_DAY";
    }
};

export const HeaderCell = ({ weekday }) => {
    const dayType = getDayTypeFromKorean(weekday);
    const colorVar = getColorVar(dayType, false);

    const styleForVar = {};
    styleForVar["--color"] = `var(${colorVar})`;

    return (
        <div style={styleForVar} className={styles.headerCell}>
            {weekday}
        </div>
    );
};

const DayCircle = ({ date, isHolyday, isToday, isDim }) => {
    const day = date.getDate();
    const dayType = isHolyday ? "HOLYDAY" : getDayType(date);
    const colorVar = getColorVar(dayType, isDim);

    const styleForVar = {};
    if (isToday) {
        styleForVar["--bg"] = `var(${colorVar})`;
        styleForVar["--color"] = "var(--color-vivid-inverted)";
    } else {
        styleForVar["--color"] = `var(${colorVar})`;
    }

    return (
        <div style={styleForVar} className={styles.dayCircle}>
            {day}
        </div>
    );
};

const EventBoxMany = ({ eventArray, isDim }) => {
    return (
        <>
            {eventArray.map((event) => (
                <EventBox key={event.id} event={event} isDim={isDim} />
            ))}
        </>
    );
};
const EventDotMany = ({ eventArray, isDim }) => {
    const isTooMuch = eventArray.length > 4;
    if (isTooMuch) {
        return <EventDot />;
    }
    return (
        <Hstack gap="xs">
            {eventArray.map((event) => (
                <EventDot key={event.id} isDim={isDim} />
            ))}
        </Hstack>
    );
};

const DateCell = ({ date, eventArray, isDim, isToday }) => {
    const { setSelectedEvent, setModalKey, size } = useCalendarContext();

    const isHolyday = false;

    const handleDoubleClick = () => {
        const selectedDate = format(date, "yyyy-MM-dd");
        setSelectedEvent({ start_time: `${selectedDate}T00:00` });

        setModalKey("agencyCalendar");
    };

    return (
        <Vstack onDoubleClick={handleDoubleClick}>
            <DayCircle isDim={isDim} date={date} isHolyday={isHolyday} isToday={isToday} />
            {size === "lg" && <EventBoxMany isDim={isDim} eventArray={eventArray} />}
            <div className={styles.eventDotContainer}>
                {size === "md" && <EventDotMany isDim={isDim} eventArray={eventArray} />}
            </div>
        </Vstack>
    );
};

export default DateCell;
