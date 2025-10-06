import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const getTimeAgo = (timestamp) => {
    const timeAgo = formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale: ko,
    });
    return timeAgo.replace("약 ", "");
};

/**
 * 뒤가 더 느림: true
 * 앞 뒤 같음: true
 * 앞이 더 느림: false
 */
export const checkIsLatterLaterTime = (formerTime, latterTime) => {
    if (!latterTime) {
        return true;
    }
    const [formerHourString, formerMinuteString] = formerTime.split(":");
    const [latterHourString, latterMinuteString] = latterTime.split(":");

    const formerHour = Number(formerHourString);
    const formerMinute = Number(formerMinuteString);
    const latterHour = Number(latterHourString);
    const latterMinute = Number(latterMinuteString);

    if (latterHour > formerHour) {
        return true;
    }

    if (latterHour === formerHour && latterMinute >= formerMinute) {
        return true;
    }

    return false;
};
