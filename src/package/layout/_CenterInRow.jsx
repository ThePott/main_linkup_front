import styles from "./_CenterInRow.module.css";
import Hstack from "./_Hstack";

const CenterInRow = ({ children, ...props }) => {
    return (
        <Hstack {...props}>
            <div className={styles.grow} />
            {children}
            <div className={styles.grow} />
        </Hstack>
    );
};

export default CenterInRow;
