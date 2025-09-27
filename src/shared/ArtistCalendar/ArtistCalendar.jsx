import { useEffect } from "react";
import Calendar from "../../package/calendar/Calendar";
import useLinkUpStore from "../store/store";

const filterEventArray = (eventArray, selectedYear, selectedMonth) => {
    const filteredEventArray = eventArray.filter((event) => {
        const year = event.start_time.slice(0, 4);
        const month = event.start_time.slice(5, 7);
        return Number(year) === selectedYear && Number(month) === selectedMonth;
    });

    return filteredEventArray;
};

const ArtistCalendar = ({ isMedium = false }) => {
    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setSelectedMonthEventArray = useLinkUpStore((state) => state.setSelectedMonthEventArray);

    const handleDateChange = (date) => {
        if (!date) {
            return;
        }
        const selectedYear = date.getFullYear();
        const selectedMonth = date.getMonth() + 1;

        const filteredEventArray = filterEventArray(eventArray, selectedYear, selectedMonth);
        setSelectedMonthEventArray(filteredEventArray);
    };

    useEffect(() => {
        handleDateChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventArray]);

    return (
        <Calendar
            size={isMedium ? "md" : "lg"}
            eventArray={eventArray}
            onDateChange={handleDateChange}
        />
    );
};

export default ArtistCalendar;
