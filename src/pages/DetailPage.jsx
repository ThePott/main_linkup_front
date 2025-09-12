import styles from "./detailPage.module.css"
import DetailContent from "../features/detail/DetailContent"

const DetailPage = () => {
    return (
<div>
    <DetailContent />;
    <div className={styles.box}>red box</div>
</div>
    )
};

export default DetailPage;
