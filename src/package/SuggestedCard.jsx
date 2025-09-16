import React from "react";
import styles from "./SuggestedCard.module.css";
import { useNavigate } from "react-router";
import RoundBox from "./RoundBox";

const SuggestedCard = ({ artistImg, artistName, artistId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail${artistId}`);
    console.log(artistId);
  };

  return (
    <RoundBox>
      <img
        src={artistImg}
        alt={artistName}
        className={styles.image}
        onClick={handleClick}
      />
    </RoundBox>
  );
};

export default SuggestedCard;
