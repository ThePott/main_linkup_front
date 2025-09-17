import React from "react";
import { useNavigate } from "react-router";
import RoundBox from "../package/RoundBox";
import ArtistCard from "./ArtistCard";

const SuggestedCard = ({ artist, type, imgWidth, borderRadius }) => {
    const navigate = useNavigate();
    const { id: artistId } = artist;

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
            <ArtistCard
                artist={artist}
                type={type}
                imgWidth={imgWidth}
                borderRadius={borderRadius}
            />
        </RoundBox>
    );
};

export default SuggestedCard;
