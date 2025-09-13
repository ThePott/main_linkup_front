import hstackStyles from "./_Hstack.module.css";
import { gapToClassName } from "./layoutUtils.js";

const Hstack = ({
    gap = "md",
    justify,
    items,
    style,
    className,
    children,
    ...props
}) => {
    const defaultClassName = hstackStyles.hstack;
    const gapClassName = gapToClassName[gap];

    if (gapClassName === undefined) {
        throw new Error("---- ERROR OCCURRED: 잘못된 gap을 사용했습니다");
    }

    const hstackStyle = {};
    hstackStyle["--justify"] = justify ? justify : "start";
    hstackStyle["--items"] = items ? items : "stretch";

    return (
        <div
            {...props}
            style={{ ...hstackStyle, ...style }}
            className={`${defaultClassName} ${gapClassName} ${className}`}
        >
            {children}
        </div>
    );
};

export default Hstack;
