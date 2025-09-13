import GridContainer from "../gridContainer/GridContainer";
import DateCell, { HeaderCell } from "./_DateCell";
import { getIsToday } from "./calendarUtils";
import useCalendar from "./useCalendar";

const Calendar = () => {
    const {
        selectedDate,
        setCurrentDate,
        trailingPrevMonthDateArray,
        selectedMonthDateArray,
        leadingNextMonthDateArray,
    } = useCalendar();
    const weekDayArray = ["일", "월", "화", "수", "목", "금", "토"];
    return (
        <GridContainer cols={7}>
            {weekDayArray.map((weekday) => (
                <HeaderCell weekday={weekday} />
            ))}
            {trailingPrevMonthDateArray.map((date) => (
                <DateCell
                    key={date}
                    isDim
                    date={date}
                    isToday={getIsToday(date)}
                />
            ))}
            {selectedMonthDateArray.map((date) => (
                <DateCell key={date} date={date} isToday={getIsToday(date)} />
            ))}
            {leadingNextMonthDateArray.map((date) => (
                <DateCell
                    key={date}
                    isDim
                    date={date}
                    isToday={getIsToday(date)}
                />
            ))}
        </GridContainer>
    );
};

export default Calendar;
