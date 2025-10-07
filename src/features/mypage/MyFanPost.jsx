import useLinkUpStore from "../../shared/store/store";
import FanPostGrid from "../../shared/FanPostGrid";
import MyFanPostModal from "./MyFanPostModal";

const MyFanPost = () => {
    const user = useLinkUpStore((state) => state.user);
    const fanPostArray = user.posts;

    if (!user) {
        return null;
    }

    return (
        <>
            <FanPostGrid isMine fanPostArray={fanPostArray} isBlurred={false} />
            <MyFanPostModal />
        </>
    );
};

export default MyFanPost;
