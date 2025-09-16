import RecommendContent from "../../../features/front/recommend/RecommendContent";
import RoundBox from "../../../package/RoundBox";
import mockData from "../../../shared/store/dummyHeehaa.json";

const HeeHaaTestPage = () => {
    const artists = mockData;
    return (
        <ul>
            <RecommendContent artists={artists} />
            <RoundBox padding="md" onClick={() => console.log("click")}>
                hi
            </RoundBox>
        </ul>
    );
};

export default HeeHaaTestPage;
