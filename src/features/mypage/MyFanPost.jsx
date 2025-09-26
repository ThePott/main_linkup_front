import useLinkUpStore from "../../shared/store/store";
import FanPostGrid from "../../shared/FanPostGrid";

const MyFanPost = () => {
    const user = useLinkUpStore((state) => state.user);
    console.log("myfanpost", user);
    const fanPostArray = user.posts;

    return (
        <>
            <FanPostGrid isMine fanPostArray={fanPostArray} isBlurred={false} />
        </>
    );
};

export default MyFanPost;
