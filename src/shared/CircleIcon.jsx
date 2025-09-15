import React from "react";
import styles from "./CircleIcon.module.css";

const CircleIcon = ({ artistImg, artistName }) => {
  return (
    <>
      <img className={styles.image} src={artistImg} alt={artistName} />
    </>
  );
};

export default CircleIcon;
