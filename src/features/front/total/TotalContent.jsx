import CircleIcon from "../../../shared/CircleIcon";
import styles from "./TotalContent.module.css";

const TotalContent = ({ subscribe }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    {subscribe.map((artist) => (
                        <CircleIcon
                            key={artist.id}
                            artist={artist}
                            type="torso"
                            imgWidth={100}
                            borderRadius="50%"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TotalContent;
