import { React } from "react";
import useLinkUpStore from "../../shared/store/store";
import FanPostList from "../../shared/FanPostList";

const MyFanPost = () => {
    const feedList = useLinkUpStore((state) => state.fanPostFeedArray);
    console.log("myfanpost", feedList);

    return (
        <>
            <FanPostList feedList={feedList} />
        </>
    );
};

export default MyFanPost;
