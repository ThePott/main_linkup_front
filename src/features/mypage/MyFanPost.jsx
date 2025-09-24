import { React } from "react";
import useLinkUpStore from "../../shared/store/store";
import FanPostGrid from "../../shared/FanPostGrid";

const MyFanPost = () => {
    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    console.log("myfanpost", fanPostArray);

    return (
        <>
            <FanPostGrid fanPostArray={fanPostArray} />
        </>
    );
};

export default MyFanPost;
