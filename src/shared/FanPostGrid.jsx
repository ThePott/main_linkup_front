import React from "react";
import { useNavigate } from "react-router";
import styles from "./FanPostGrid.module.css";
import GridCardContainer from "./GridCardContainer/GridCardContainer";
import CustomImageCard from "./CustomImageCard/CustomImageCard";
import RoundBox from "../package/RoundBox";

const FanPostGrid = ({ fanPostArray }) => {
    const navigate = useNavigate();
    const handleCreate = () => navigate("/mypage/write");
    console.log(fanPostArray);

    return (
        <GridCardContainer cols="auto">
            <ul className={styles.container}>
                <RoundBox onClick={handleCreate}>+</RoundBox>
                {fanPostArray.map((post) => (
                    <CustomImageCard key={post.id} url={post.imageUrl} alt={post.artistName} />
                ))}
            </ul>
        </GridCardContainer>
    );
};

export default FanPostGrid;
// <p>{post.artistName}</p>
// <p>{post.content}</p>
