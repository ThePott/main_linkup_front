import RoundBox from "../RoundBox";
import styles from "./EventBox.module.css";

const EventBox = ({ event }) => {
    return (
        <RoundBox padding="lg" isShadowed={false} textAlign="start">
            <p>{event.start_time.slice(0, 10)}</p>
            <p className={styles.title}>{event.title}</p>
            <p className={styles.description}>{event.description}</p>
        </RoundBox>
    );
};

export default EventBox;
