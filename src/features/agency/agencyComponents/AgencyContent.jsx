import styles from "./AgencyContent.module.css";
import { Hstack, Vstack } from "../../../package/layout";
import AgencySidebar from "./AgencySidebar";
import FlexOneContainer from "../../../package/flexOneContainer/FlexOneContainer";
import AgencyCalendar from "./AgencyCalendar";

const AgencyContent = () => {
    return (
        <>
            <Hstack gap="none" className={styles.agencyScreen}>
                <AgencySidebar />
                <FlexOneContainer>
                    <Vstack items="center" className={styles.fullHeight}>
                        <AgencyCalendar />
                    </Vstack>
                </FlexOneContainer>
            </Hstack>
        </>
    );
};

export default AgencyContent;
