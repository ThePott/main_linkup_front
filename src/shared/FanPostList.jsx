import React from "react";
import { useNavigate } from "react-router";
import styles from "./FanPostList.module.css";
import GridCardContainer from "./GridCardContainer/GridCardContainer";

const FanPostList = ({ feedList }) => {
    const navigate = useNavigate();
    const handleCreate = () => navigate("/mypage/write");
    console.log(feedList);

    return (
        <GridCardContainer cols="auto">
            <ul className={styles.container}>
                <li className={styles.addBtn} onClick={handleCreate}>
                    <span>+</span>
                </li>

                {feedList.map((post, index) => (
                    <li key={index} className={styles.fanpostItem}>
                        {/* <img src={post.imageUrl} alt={post.artistName} /> */}
                        <p>{post.artistName}</p>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </GridCardContainer>
    );
};

export default FanPostList;
