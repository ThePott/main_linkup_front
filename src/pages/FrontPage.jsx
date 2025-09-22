import { useState } from "react";
import { Hstack } from "../package/layout";
import CustomButton from "../package/customButton/CustomButton";
import RecommendContent from "../features/front/recommend/RecommendContent";
import TotalContent from "../features/front/total/TotalContent";
import SearchContent from "../features/front/search/SearchContent";
import { useFront } from "../features/front/useFront";

/** 임시로 각 콘텐트로 이동시키게 만들었습니다. */
const FrontPage = () => {
    const [whatToShow, setWhatToShow] = useState(null);

    useFront();

    if (!whatToShow) {
        return (
            <Hstack>
                <CustomButton onClick={() => setWhatToShow("RECOMMEND")}>
                    추천 콘텐트
                </CustomButton>
                <CustomButton onClick={() => setWhatToShow("TOTAL")}>
                    전체 콘텐트
                </CustomButton>
                <CustomButton onClick={() => setWhatToShow("SEARCH")}>
                    검색 콘텐트
                </CustomButton>
            </Hstack>
        );
    }

    switch (whatToShow) {
        case "RECOMMEND":
            return <RecommendContent />;
        case "TOTAL":
            return <TotalContent />;
        case "SEARCH":
            return <SearchContent />;
        default:
            throw new Error("---- ERROR OCCURRED: Wrong What To Show");
    }
};

export default FrontPage;
