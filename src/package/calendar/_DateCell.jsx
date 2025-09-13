import styles from "./calendar.module.css";

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

export const HeaderCell = ({ weekday }) => {
    const defaultClassName = styles.common;
    const dayType = getDayTypeFromKorean(weekday);
    const dayTypeClassName = dayTypeToClassName[dayType];
    const className = `${defaultClassName} ${dayTypeClassName}`;
    return <div className={className}>{weekday}</div>;
};

const DateBox = ({ date, isDim, isToday }) => {
    const isHolyday = false;
    const dayType = isHolyday ? "HOLYDAY" : getDayType(date);
    const day = date.getDate();

    const defaultClassName = `${styles.common} ${styles.day}`;
    const opacityClassName = isDim ? styles.dim : "";
    const dayTypeClassName = dayTypeToClassName[dayType];
    const className = `${defaultClassName} ${opacityClassName} ${dayTypeClassName}`;

    return <div className={className}>{day}</div>;
};

export default DateBox;
