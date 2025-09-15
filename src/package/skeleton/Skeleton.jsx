import styles from "./Skeleton.module.css";
import { makeSkeletonSizeStyle } from "./skeletonUtils";

const Skeleton = ({
    skeletonVariant = "BOX",
    fontVariant,
    heightInPixel,
    widthInPixel,
    style,
    className,
}) => {
    const sizeStyle = makeSkeletonSizeStyle(
        skeletonVariant,
        fontVariant,
        heightInPixel,
        widthInPixel,
    );
    return (
        <div
            style={{ ...sizeStyle, ...style }}
            className={`${styles.skeleton} ${className}`}
        />
    );
};

export default Skeleton;
