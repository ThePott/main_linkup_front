import React from "react";
import styles from "./CircleIcon.module.css";
import { useNavigate } from "react-router";

const CircleIcon = ({ artist }) => {
  const { id, name, img_face } = artist;
  const navigate = useNavigate();

  return (
    <li
      key={id}
      className={styles.container}
      onClick={() => {
        navigate(`/detail/${id}`);
        console.log(id);
      }}
    >
      <img className={styles.image} src={img_face} alt={name} />
    </li>
  );
};

export default CircleIcon;
