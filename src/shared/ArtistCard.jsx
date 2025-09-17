import React from "react";

const defaultImageSize = {
    FACE: { width: 200, height: 300 },
    TORSO: { width: 250, height: 300 },
    BANNER: { width: "100%", height: 350 },
};

const imageType = {
    FACE: "img_face",
    TORSO: "img_torso",
    BANNER: "img_banner",
};

const ArtistCard = ({
    artist,
    type,
    imgWidth,
    borderRadius,
    style,
    ...props
}) => {
    const typeKey = (type || "TORSO").toUpperCase();
    const imgKey = imageType[typeKey];
    const imgSrc = artist && imgKey ? artist[imgKey] : null;
    const widthValue =
        typeof imgWidth === "number" ? `${imgWidth}px` : imgWidth;

    if (!imgSrc) return <div>No image</div>;

    const finalSize =
        widthValue !== undefined ? widthValue : defaultImageSize[typeKey];

    const imgStyle =
        typeof finalSize === "object"
            ? {
                  width: finalSize.width,
                  height: finalSize.height,
                  objectFit: "cover",
                  borderRadius:
                      borderRadius || (style && style.borderRadius) || 0,
                  ...style,
              }
            : {
                  width: finalSize,
                  height: finalSize,
                  objectFit: "cover",
                  borderRadius:
                      borderRadius || (style && style.borderRadius) || 0,
                  ...style,
              };

    return (
        <img
            src={imgSrc}
            alt={artist.name || "artist"}
            style={imgStyle}
            {...props}
        />
    );
};

export default ArtistCard;
