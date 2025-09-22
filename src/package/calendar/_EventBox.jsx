import styles from "./calendar.module.css";
const EventBox = ({ event }) => {
    const { id, sttime, edtime, title, subjectId, subjectName } = event;
    return <div className={styles.eventBox}>{title}</div>;
};

export default EventBox;
