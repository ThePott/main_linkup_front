import { getThenLog } from "../../../../package/commonServices/fetchVariants";
import CustomButton from "../../../../package/customButton/CustomButton";

const baseURL = import.meta.env.VITE_BASE_URL;

const TestPostsButtonMany = ({ accessToken }) => {
    const getPosts = () => getThenLog(`${baseURL}/api/posts`);
    const getPostsOfAespa = () => getThenLog(`${baseURL}/api/posts/artist_id=1`);
    // 팬 포스트 POST 하려면 폼 데이터로 보내야 한다

    return (
        <>
            <CustomButton onClick={getPosts}>
                <p>get all posts</p>
            </CustomButton>
            <CustomButton onClick={getPostsOfAespa}>
                <p>get posts of first idol</p>
            </CustomButton>
        </>
    );
};

export default TestPostsButtonMany;
