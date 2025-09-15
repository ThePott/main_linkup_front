import React from "react";
import styles from "./SuggestedCard.module.css";
import { useNavigate } from "react-router";
import RoundBox from "./RoundBox";

const SuggestedCard = ({ idolImg, idolName, idolId }) => {
  const navigate = useNavigate();

  // detail뒤에 id를 줘야함
  const handleClick = () => {
    navigate(`/detail`);
    console.log(idolId);
  };

  return (
    <RoundBox>
      <img
        src={idolImg}
        alt={idolName}
        className={styles.image}
        onClick={handleClick}
      />
    </RoundBox>
  );
};

export default SuggestedCard;
