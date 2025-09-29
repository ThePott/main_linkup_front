import { Hstack, Vstack } from "../layout";
import EventBox, { EventDot } from "./_EventBox";
import styles from "./calendar.module.css";
import { useCalendarContext } from "./CalendarContext";

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

const dayTypeToClassName = {
    SUNDAY: styles.sunday,
    SATURDAY: styles.saturday,
    BUSINESS_DAY: styles.businessDay,
};

const dayTypeToColor = {
    SUNDAY: "var(--color-red)",
    SATURDAY: "var(--color-blue)",
    BUSINESS_DAY: "var(--color-vivid)",
};

export const HeaderCell = ({ weekday }) => {
    const defaultClassName = styles.headerCell;
    const dayType = getDayTypeFromKorean(weekday);
    const dayTypeClassName = dayTypeToClassName[dayType];
    const className = `${defaultClassName} ${dayTypeClassName}`;
    return <div className={className}>{weekday}</div>;
};

const DayCircle = ({ date, isHolyday, isToday }) => {
    const dayType = isHolyday ? "HOLYDAY" : getDayType(date);
    const day = date.getDate();
    const dayTypeClassName = dayTypeToClassName[dayType];
    const defaultClassName = styles.dayCircle;
    const todayClassName = isToday ? styles.today : "";
    const className = `${dayTypeClassName} ${defaultClassName} ${todayClassName}`;

    const style = { "--color-today": dayTypeToColor[dayType] };
    return (
        <div style={style} className={className}>
            {day}
        </div>
    );
};

const EventBoxMany = ({ eventArray }) => {
    return (
        <>
            {eventArray.map((event) => (
                <EventBox key={event.id} event={event} />
            ))}
        </>
    );
};
const EventDotMany = ({ eventArray }) => {
    const isTooMuch = eventArray.length > 4;
    if (isTooMuch) {
        return <EventDot />;
    }
    return (
        <Hstack gap="xs">
            {eventArray.map(() => (
                <EventDot />
            ))}
        </Hstack>
    );
};

const DateCell = ({ date, eventArray, isDim, isToday }) => {
    const { setSelectedEvent, setModalKey, size } = useCalendarContext();

    const isHolyday = false;

    const opacityClassName = isDim ? styles.dim : "";
    const className = `${opacityClassName}`;

    const handleDoubleClick = () => {
        setSelectedEvent({});

        setModalKey("agencyCalendar");
    };

    return (
        <Vstack className={className} onDoubleClick={handleDoubleClick}>
            <DayCircle date={date} isHolyday={isHolyday} isToday={isToday} />
            {size === "lg" && <EventBoxMany eventArray={eventArray} />}
            {size === "md" && <EventDotMany eventArray={eventArray} />}
        </Vstack>
    );
};

export default DateCell;
