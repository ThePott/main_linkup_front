import Calendar from "../../package/calendar/Calendar";
import useLinkUpStore from "../store/store";

const ArtistCalendar = ({ isBig = false }) => {
    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setSelectedMonthEventArray = useLinkUpStore((state) => state.setSelectedMonthEventArray);

    const handleDateChange = (date) => {
        console.log({ eventArray });
        debugger;
    };

    return <Calendar eventArray={eventArray} onDateChange={handleDateChange} />;
};

export default ArtistCalendar;
