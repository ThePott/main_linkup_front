import React from "react";
import { useNavigate } from "react-router";
import RoundBox from "./RoundBox";
import ArtistCard from "../shared/ArtistCard";

const SuggestedCard = ({ artist, type, imgWidth, borderRadius }) => {
    const navigate = useNavigate();
    const { id: artistId } = artist;

    const handleClick = () => {
        navigate(`/detail${artistId}`);
        console.log(artistId);
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
