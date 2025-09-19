import RoundBox from "../../../package/RoundBox";
import mockData from "../../../shared/store/dummyHeehaa.json";
import styles from "./HeeHaaTestPage.module.css";

const HeeHaaTestPage = () => {
    const subscribe = mockData;
    return (
        <>
            <RoundBox className={styles.container}>
                <img
                    src="https://plus.unsplash.com/premium_photo-1693011410791-98015d7021e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                    alt="img"
                    style={{ width: "50px" }}
                />
            </RoundBox>
            <RoundBox>
                <img
                    src="https://plus.unsplash.com/premium_photo-1693011410791-98015d7021e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                    alt="img"
                    style={{ width: "50px" }}
                />
            </RoundBox>
        </>
    );
};

export default HeeHaaTestPage;
