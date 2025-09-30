import GridCardContainer from "./GridCardContainer/GridCardContainer.jsx";
import CustomImageCard from "./CustomImageCard/CustomImageCard.jsx";

const FanPostSection = ({ posts, onClickPost, limit = posts.length }) => {
    const limitedPostArray = posts?.slice(0, limit) ?? [];
    return (
        <GridCardContainer>
            {limitedPostArray.map((post) => (
                <div key={post.postId} onClick={() => onClickPost(post.postId)}>
                    <CustomImageCard url={post.imgUrl} alt={post.title} />
                    {/* 댓글수와 좋아요수는 임의로 작성함  */}
                    <div>
                        <span>♥ {post.likes ?? 55}</span>
                        <span>💬 {post.comments ?? 13}</span>
                    </div>
                </div>
            ))}
        </GridCardContainer>
    );
};

export default FanPostSection;
