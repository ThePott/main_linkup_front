import { createContext, useContext } from "react";

export const CalendarContext = createContext(null);

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("---- ERROR OCCURRED: 컨텍스트가 없습니다");
    }
    return context;
};
