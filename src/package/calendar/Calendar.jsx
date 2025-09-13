import GridContainer from "../gridContainer/GridContainer";
import { CenterInRow, Hstack, Vstack } from "../layout";
import DateCell, { HeaderCell } from "./_DateCell";
import { getIsToday } from "./calendarUtils";
import useCalendar from "./useCalendar";
import styles from "./calendar.module.css";
import CustomButton from "../customButton/CustomButton";

const Calendar = () => {
    const {
        selectedDate,
        setCurrentDate,
        trailingPrevMonthDateArray,
        selectedMonthDateArray,
        leadingNextMonthDateArray,
        goToPrevMonth,
        goToNextMonth,
    } = useCalendar();
    const weekDayArray = ["일", "월", "화", "수", "목", "금", "토"];
    const fullYear = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    return (
        <Vstack>
            <Hstack className={styles.bold}>
                <CustomButton onClick={goToPrevMonth}>{"<"}</CustomButton>
                <CustomButton onClick={goToNextMonth}>{">"}</CustomButton>
                <div>
                    {fullYear}년 {month}월
                </div>
            </Hstack>
            <GridContainer cols={7}>
                {weekDayArray.map((weekday) => (
                    <HeaderCell key={weekday} weekday={weekday} />
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
                    <DateCell
                        key={date}
                        date={date}
                        isToday={getIsToday(date)}
                    />
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
        </Vstack>
    );
};

export default Calendar;
