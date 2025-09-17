import React from "react";
import { useNavigate } from "react-router";
import ArtistCard from "./ArtistCard";

const CircleIcon = ({ artist, type, imgWidth, borderRadius, ...props }) => {
    const navigate = useNavigate();
    const { id: artistId } = artist;

    return (
        <li
            onClick={() => {
                navigate(`/detail/artist/${artistId}`);
                console.log(artistId);
            }}
            style={{
                display: "inline-block",
                margin: "var(--spacing-sm)",
            }}
        >
            <ArtistCard
                artist={artist}
                type={type}
                imgWidth={imgWidth}
                borderRadius={borderRadius}
                {...props}
            />
        </li>
    );
};

export default CircleIcon;
