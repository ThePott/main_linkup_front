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
    const firstDay = getFirstDayOfMonth(date);
    if (firstDay.getDay() === 0) {
        return [];
    }

    return eachDayOfInterval({
        start: startOfWeek(firstDay),
        end: subDays(firstDay, 1),
    });
};

const getSelecteMonthDateArray = (date) => {
    return eachDayOfInterval({
        start: getFirstDayOfMonth(date),
        end: getLastDateOfMonth(date),
    });
};
const getLeadingNextMonthDateArray = (date) => {
    const lastDay = getLastDateOfMonth(date);
    if (lastDay.getDay() === 6) {
        return [];
    }
    const nextOfLastDay = addDays(lastDay, 1);

    return eachDayOfInterval({
        start: nextOfLastDay,
        end: endOfWeek(nextOfLastDay),
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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const selectedMonth = getMonth(selectedDate);

    const { trailingPrevMonthDateArray, selectedMonthDateArray, leadingNextMonthDateArray } =
        useMemo(() => getMonthDateArrayDict(selectedDate), [selectedMonth]);

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
