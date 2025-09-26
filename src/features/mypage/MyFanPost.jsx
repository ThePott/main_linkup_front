import useLinkUpStore from "../../shared/store/store";
import FanPostGrid from "../../shared/FanPostGrid";

const MyFanPost = () => {
    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    console.log("myfanpost", fanPostArray);

    return (
        <>
            <FanPostGrid isMine fanPostArray={fanPostArray} />
        </>
    );
};

export default MyFanPost;
