import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const getTimeAgo = (timestamp) => {
    const timeAgo = formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale: ko,
    });
    return timeAgo.replace("약 ", "");
};
