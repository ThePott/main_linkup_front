import React from "react";
import { useNavigate } from "react-router";
import styles from "./FanPostGrid.module.css";
import GridCardContainer from "./GridCardContainer/GridCardContainer";
import CustomImageCard from "./CustomImageCard/CustomImageCard";

const FanPostGrid = ({ fanPostArray }) => {
    const navigate = useNavigate();
    const handleCreate = () => navigate("/mypage/write");
    console.log(fanPostArray);

    return (
        <GridCardContainer cols="auto">
            <ul className={styles.container}>
                <li className={styles.addBtn} onClick={handleCreate}>
                    <span>+</span>
                </li>

                {fanPostArray.map((post, index) => (
                    <li key={index} className={styles.fanpostItem}>
                        <CustomImageCard
                            url={post.imageUrl}
                            alt={post.artistName}
                        />
                        <p>{post.artistName}</p>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </GridCardContainer>
    );
};

export default FanPostGrid;
