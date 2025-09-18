import GridContainer from "../gridContainer/GridContainer";
import { Hstack, Vstack } from "../layout";
import DateCell, { HeaderCell } from "./_DateCell";
import { getIsToday } from "./calendarUtils";
import useCalendar from "./useCalendar";
import styles from "./calendar.module.css";
import CustomButton from "../customButton/CustomButton";
import { format } from "date-fns";

const formatToYmd = (date) => format(date, "yyyyMMdd");

const groupEventArrayBySttime = (eventArray) => {
    const groupedEvent = Object.groupBy(eventArray, (event) =>
        formatToYmd(event.sttime),
    );
    return groupedEvent;
};

const Calendar = ({ eventArray }) => {
    const {
        selectedDate,
        // setCurrentDate,
        trailingPrevMonthDateArray,
        selectedMonthDateArray,
        leadingNextMonthDateArray,
        goToPrevMonth,
        goToNextMonth,
    } = useCalendar();

    const dateWithIsDimArray = [
        ...trailingPrevMonthDateArray.map((date) => ({ date, isDim: true })),
        ...selectedMonthDateArray.map((date) => ({ date, isDim: false })),
        ...leadingNextMonthDateArray.map((date) => ({ date, isDim: true })),
    ];

    const weekDayArray = ["일", "월", "화", "수", "목", "금", "토"];
    const fullYear = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;

    const groupedEvent = groupEventArrayBySttime(eventArray);

    return (
        <Vstack>
            <Hstack
                justify="end"
                items="center"
                gap="none"
                className={styles.bold}
            >
                <div>
                    {fullYear}년 {month}월
                </div>
                <CustomButton onClick={goToPrevMonth}>{"<"}</CustomButton>
                <CustomButton onClick={goToNextMonth}>{">"}</CustomButton>
            </Hstack>
            <GridContainer cols={7}>
                {weekDayArray.map((weekday) => (
                    <HeaderCell key={weekday} weekday={weekday} />
                ))}
                {dateWithIsDimArray.map(({ date, isDim }) => (
                    <DateCell
                        key={date}
                        isDim={isDim}
                        date={date}
                        eventArray={groupedEvent[formatToYmd(date)]}
                        isToday={getIsToday(date)}
                    />
                ))}
            </GridContainer>
        </Vstack>
    );
};

export default Calendar;
