import RecommendContent from "../../../features/front/recommend/RecommendContent";
import mockData from "../../../shared/store/dummyHeehaa.json";

const HeeHaaTestPage = () => {
  const artists = mockData;
  return (
    <ul>
      <RecommendContent artists={artists} />
    </ul>
  );
};

export default HeeHaaTestPage;
