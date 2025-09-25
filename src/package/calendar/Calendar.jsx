import GridContainer from "../gridContainer/GridContainer";
import { Hstack, Vstack } from "../layout";
import DateCell, { HeaderCell } from "./_DateCell";
import { getIsToday } from "./calendarUtils";
import useCalendar from "./useCalendar";
import styles from "./calendar.module.css";
import CustomButton from "../customButton/CustomButton";
import { format } from "date-fns";
import { CalendarContext } from "./CalendarContext";

const formatToYmd = (date) => format(date, "yyyyMMdd");

const groupEventArrayBySttime = (eventArray) => {
    const groupedEvent = Object.groupBy(eventArray, (event) => formatToYmd(event.start_time));
    return groupedEvent;
};

/**
 * @param {object} props
 * @param {Event[]} props.eventArray
 * @param {"SM" | "MD" | "LG"} props.size
 * @param {boolean} props.isSmall
 */
const Calendar = ({
    eventArray = [],
    isSmall,
    setModalKey,
    setSelectedEvent,
    additionalButtonArray = [],
}) => {
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

    const contextValue = {
        setModalKey,
        setSelectedEvent,
    };

    return (
        <CalendarContext.Provider value={contextValue}>
            <Vstack className={styles.calendar}>
                <Hstack justify="start" items="center" gap="none" className={styles.bold}>
                    <CustomButton onClick={goToPrevMonth}>{"<"}</CustomButton>
                    <CustomButton onClick={goToNextMonth}>{">"}</CustomButton>
                    <div>
                        {fullYear}년 {month}월
                    </div>
                    <div className="grow" />
                    {additionalButtonArray.map((button) => (
                        <>{button}</>
                    ))}
                </Hstack>
                <GridContainer cols={7}>
                    {weekDayArray.map((weekday) => (
                        <HeaderCell key={weekday} weekday={weekday} />
                    ))}
                </GridContainer>
                <GridContainer cols={7} rows={isSmall ? undefined : 5}>
                    {dateWithIsDimArray.map(({ date, isDim }) => (
                        <DateCell
                            key={`${fullYear}__${month}__${date.toDateString()}`}
                            isDim={isDim}
                            date={date}
                            eventArray={groupedEvent[formatToYmd(date)] ?? []}
                            isToday={getIsToday(date)}
                        />
                    ))}
                </GridContainer>
            </Vstack>
        </CalendarContext.Provider>
    );
};

export default Calendar;
