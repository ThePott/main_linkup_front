import React from "react";
import { useNavigate } from "react-router";
import RoundBox from "../package/RoundBox";
import CustomImageCard from "./CustomImageCard/CustomImageCard";

const SuggestedCard = ({ artist }) => {
    const navigate = useNavigate();
    const { id: artistId, profile_image: imgUrl } = artist;

    const handleClick = () => {
        navigate(`/detail/artist/${artistId}`);
    };

    return (
        <RoundBox
            onClick={handleClick}
            style={{
                width: "fit-content",
                overflow: "hidden",
                cursor: "pointer",
            }}
        >
            <CustomImageCard url={imgUrl} style={{ height: "200px" }} />
        </RoundBox>
    );
};

export default SuggestedCard;
