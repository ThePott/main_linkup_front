export const getIsToday = (date) => {
    const today = new Date(); // Get today's date and time

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};
