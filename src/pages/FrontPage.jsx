import RecommendContent from "../features/front/recommend/RecommendContent";
import TotalContent from "../features/front/total/TotalContent";
import SearchContent from "../features/front/search/SearchContent";
import { useFront } from "../features/front/useFront";
import { useSearchParams } from "react-router";
import useLinkUpStore from "../shared/store/store";

/** 임시로 각 콘텐트로 이동시키게 만들었습니다. */
const FrontPage = () => {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("query");
    const artistArray = useLinkUpStore((state) => state.artistArray);

    useFront();

    if (queryParam) {
        return <SearchContent />;
    }
    if (artistArray.length === 0) {
        return <RecommendContent />;
    }
    return <TotalContent />;
};
export default FrontPage;
