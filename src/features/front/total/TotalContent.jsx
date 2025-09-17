import Calendar from "../../../package/calendar/Calendar";
import RoundBox from "../../../package/RoundBox";
import ArtistCard from "../../../shared/ArtistCard";
import CircleIcon from "../../../shared/CircleIcon";
import styles from "./TotalContent.module.css";

const TotalContent = ({ subscribe }) => {
    return (
        <div className={styles.container}>
            {subscribe.map((artist) => (
                <CircleIcon
                    key={artist.id}
                    artist={artist}
                    type="torso"
                    imgWidth={100}
                    borderRadius="50%"
                />
            ))}

            <RoundBox style={{ overflow: "hidden" }}>
                <ArtistCard type={"banner"} artist={subscribe[0]} />
            </RoundBox>
            <p className={styles.text}>스케줄</p>
            <div className={styles.calendarContainer}>
                <span
                    className={styles.calendar}
                    onClick={(e) => console.log(e.target.value)}
                >
                    <Calendar />
                </span>
                <span>
                    <RoundBox
                        style={{
                            width: "500px",
                            height: "100px",
                            lineHeight: "100px",
                            marginLeft: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        <p className={styles.dailySchedule}>
                            <span className={styles.date}>01월 00일 </span>
                            <span className={styles.scheduleLocation}>
                                사직 콘서트
                            </span>
                        </p>
                    </RoundBox>
                    <RoundBox
                        style={{
                            width: "500px",
                            height: "100px",
                            lineHeight: "100px",
                            marginLeft: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        <p className={styles.dailySchedule}>
                            <span className={styles.date}>02월 00일 </span>
                            <span className={styles.scheduleLocation}>
                                라팍 콘서트
                            </span>
                        </p>
                    </RoundBox>
                    <RoundBox
                        style={{
                            width: "500px",
                            height: "100px",
                            lineHeight: "100px",
                            marginLeft: "20px",
                        }}
                    >
                        <p className={styles.dailySchedule}>
                            <span className={styles.date}>03월 00일 </span>
                            <span className={styles.scheduleLocation}>
                                잠실 콘서트
                            </span>
                        </p>
                    </RoundBox>
                </span>
            </div>
        </div>
    );
};

export default TotalContent;
