import { useState, useMemo } from "react";

import {
    addMonths,
    eachDayOfInterval,
    getMonth,
    getYear,
    startOfWeek,
    endOfWeek,
    addDays,
    subDays,
    subMonths,
} from "date-fns";

const getFirstDayOfMonth = (date) => {
    return new Date(getYear(date), getMonth(date), 1);
};

const getLastDateOfMonth = (date) => {
    return new Date(getYear(date), getMonth(date) + 1, 0);
};

const getTrailingPrevMonthDateArray = (date) => {
    return eachDayOfInterval({
        start: startOfWeek(getFirstDayOfMonth(date)),
        end: subDays(getFirstDayOfMonth(date), 1),
    });
};

const getSelecteMonthDateArray = (date) => {
    return eachDayOfInterval({
        start: getFirstDayOfMonth(date),
        end: getLastDateOfMonth(date),
    });
};
const getLeadingNextMonthDateArray = (date) => {
    return eachDayOfInterval({
        start: addDays(getLastDateOfMonth(date), 1),
        end: endOfWeek(getLastDateOfMonth(date)),
    });
};

const getMonthDateArrayDict = (date) => {
    return {
        trailingPrevMonthDateArray: getTrailingPrevMonthDateArray(date),
        selectedMonthDateArray: getSelecteMonthDateArray(date),
        leadingNextMonthDateArray: getLeadingNextMonthDateArray(date),
    };
};

const useCalendar = () => {
    const now = new Date();
    const date = now.setHours(0, 0, 0, 0);
    const [selectedDate, setSelectedDate] = useState(date);
    const selectedMonth = getMonth(selectedDate);

    const {
        trailingPrevMonthDateArray,
        selectedMonthDateArray,
        leadingNextMonthDateArray,
    } = useMemo(() => getMonthDateArrayDict(selectedDate), [selectedMonth]);

    const goToPrevMonth = () => {
        setSelectedDate(subMonths(new Date(selectedDate), 1));
    };

    const goToNextMonth = () => {
        setSelectedDate(addMonths(new Date(selectedDate), 1));
    };

    return {
        selectedDate,
        setCurrentDate: setSelectedDate,
        goToNextMonth,
        goToPrevMonth,
        trailingPrevMonthDateArray,
        selectedMonthDateArray,
        leadingNextMonthDateArray,
    };
};

export default useCalendar;
