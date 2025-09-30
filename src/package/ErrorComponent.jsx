import React from "react";
import RoundBox from "./RoundBox";
import styles from "./ErrorComponent.module.css";

const ErrorComponent = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>요청 중 오류가 발생했습니다.</h2>
        </div>
    );
};

export default ErrorComponent;
