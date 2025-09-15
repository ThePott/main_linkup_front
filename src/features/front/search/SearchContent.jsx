import useLinkUpStore from "../../../shared/store/Mijindummy.js";
import { useNavigate } from "react-router";
import RoundBox from "../../../package/RoundBox.jsx";

const SearchContent = () => {
  const artists = useLinkUpStore((state) => state.artists);
  const searchStatus = useLinkUpStore((state) => state.searchStatus);
  const recommendedGroups = useLinkUpStore((state) => state.recommendedGroups);
  const navigate = useNavigate();
  const groups = artists.filter((a) => a.artist_is_group);
  const members = artists.filter((a) => !a.artist_is_group);

  // 검색 실패 화면
  if (searchStatus === "fail") {
    return (
      <div>
        <h2>검색 결과</h2>
        <p>일치하는 결과를 찾지 못했어요.</p>
        <h3>찾으시는 그룹이 이 그룹이신가요?</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          {recommendedGroups.slice(0, 2).map((group) => (
            <RoundBox
              key={group.artist_id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/detail/${group.artist_id}`)}
            >
              <img src={group.img_face} alt={group.artist_name} width={80} />
              <div>{group.artist_name}</div>
            </RoundBox>
          ))}
        </div>
      </div>
    );
  }

  // 검색 성공 화면
  return (
    <div>
      <h2>검색 결과</h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          padding: "0.5rem 0",
        }}
      >
        {/* 그룹 */}
        {groups.map((group) => (
          <RoundBox
            key={group.artist_id}
            style={{ cursor: "pointer", flex: "0 0 auto" }}
            onClick={() => navigate(`/detail/${group.artist_id}`)}
          >
            <img
              src={group.img_face}
              alt={group.group_name}
              width={80}
              style={{ display: "block", margin: "0 auto" }}
            />
            <div>{group.group_name}</div>
          </RoundBox>
        ))}

        {/* 멤버 */}
        {members.map((member) => (
          <RoundBox
            key={member.artist_id}
            style={{ cursor: "pointer", flex: "0 0 auto" }}
            onClick={() => navigate(`/detail/${member.artist_id}`)}
          >
            <img
              src={member.img_face}
              alt={member.group_member_name}
              width={80}
              style={{ display: "block", margin: "0 auto" }}
            />
            <div>{member.group_member_name}</div>
          </RoundBox>
        ))}
      </div>

      {/* 일정 3개 */}
      <h3>최근 일정</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {groups[0]?.schedules.slice(0, 3).map((s, i) => (
          <RoundBox key={i}>
            {s.title} - {s.sttime}
          </RoundBox>
        ))}
      </div>

      {/* 팬포스트 */}
      <h3>팬포스트</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {groups[0]?.posts.slice(0, 36).map((post) => (
          <RoundBox key={post.post_id} style={{ textAlign: "left" }}>
            {post.content}
          </RoundBox>
        ))}
      </div>
    </div>
  );
};

export default SearchContent;