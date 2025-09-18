import GridContainer from "../package/gridContainer/GridContainer.jsx";
import RoundBox from "../package/RoundBox.jsx";

const FanPostSection = ({ posts, onClickPost, limit = posts.length, cols = 3 }) => {
  return (
    <div>
      <GridContainer cols={cols}>
        {posts.slice(0, limit).map((post) => (
          <div key={post.postId} style={{ cursor: "pointer" }}>

            <RoundBox
              onClick={() => onClickPost(post.postId)}
              style={{ height: "160px" }} 
            >
            </RoundBox>

            <div
              style={{
                display: "flex",
                gap: "0.9rem",
                marginTop: "0.6rem",
                marginLeft: "0.6rem",
                fontSize: "1rem",
              }}
            >
              {/* 좋아요수, 댓글수는 임의로 설정 */}
              <span>♥ {post.likes ?? 55}</span>
              <span>💬 {post.comments ?? 13}</span>
            </div>
          </div>
        ))}
      </GridContainer>
    </div>
  );
};

export default FanPostSection;
