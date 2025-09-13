import hstackStyles from "./_Hstack.module.css";
import { gapToClassName } from "./layoutUtils.js";

const Hstack = ({ gap = "md", className, children, ...props }) => {
    const defaultClassName = hstackStyles.hstack;
    const gapClassName = gapToClassName[gap];

    if (!gapClassName) {
        throw new Error("---- ERROR OCCURRED: 잘못된 spacing을 사용했습니다");
    }

    return (
        <div
            {...props}
            className={`${defaultClassName} ${gapClassName} ${className}`}
        >
            {children}
        </div>
    );
};

export default Hstack;
