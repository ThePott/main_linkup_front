import React from "react";
import styles from "./RoundBox.module.css";

const RoundBox = ({ children, style, ...rest }) => {
  return (
    <div
      className={styles.container}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default RoundBox;
