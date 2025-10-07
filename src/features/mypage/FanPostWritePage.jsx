import FanPostWriteContent from "./FanPostWriteContent";
import useRedirectIfNot from "../../shared/utils/useRedirectIfNot";

const FanPostWritePage = () => {
    const { isOkayToShow } = useRedirectIfNot("fan");

    if (!isOkayToShow) {
        return null;
    }

    return (
        <>
            <h2>팬 포스팅 화면</h2>
            <FanPostWriteContent />
        </>
    );
};

export default FanPostWritePage;
