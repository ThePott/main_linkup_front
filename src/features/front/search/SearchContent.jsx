import useLinkUpStore from "../../../shared/store/dummyMijin.js";
import { useNavigate } from "react-router";
import RoundBox from "../../../package/RoundBox.jsx";

const SearchContent = () => {
  const groupArray = useLinkUpStore((state) => state.groupArray);
  const searchStatus = useLinkUpStore((state) => state.searchStatus);
  const recommendedGroupArray = useLinkUpStore(
    (state) => state.recommendedGroupArray
  );
  const navigate = useNavigate();

  // 검색 실패 화면
  if (searchStatus === "fail") {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2>검색 결과</h2>
        <p>일치하는 결과를 찾지 못했어요.</p>
        <h3>찾으시는 그룹이 이 그룹이신가요?</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          {recommendedGroupArray.slice(0, 2).map((group) => (
            <RoundBox
              key={group.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/detail/${group.id}`)}
            >
              <img src={group.imgFace} alt={group.name} width={80} />
              <div>{group.name}</div>
            </RoundBox>
          ))}
        </div>
      </div>
    );
  }

  // 검색 성공 화면
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2>검색 결과</h2>

      {groupArray.map((group) => {
        const combinedSchedules = [
          ...group.groupScheduleArray.map((s) => ({
            ...s,
            owner: group.name, // 그룹
          })),
          ...group.memberArray.flatMap((member) =>
            member.scheduleArray.map((ms) => ({
              ...ms,
              owner: member.name, // 멤버
            }))
          ),
        ].sort((a, b) => new Date(a.sttime) - new Date(b.sttime));

        const topSchedules = combinedSchedules.slice(0, 3);

        return (
          <div key={group.id} style={{ marginBottom: "2rem" }}>
            {/* 그룹 + 멤버 */}
            <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
              <RoundBox
                style={{ cursor: "pointer", flex: "0 0 auto" }}
                onClick={() => navigate(`/detail/${group.id}`)}
              >
                <img src={group.imgFace} alt={group.name} width={80} />
                <div>{group.name}</div>
              </RoundBox>

              {group.memberArray.map((member) => (
                <RoundBox
                  key={member.id}
                  style={{ cursor: "pointer", flex: "0 0 auto" }}
                  onClick={() => navigate(`/detail/${member.id}`)}
                >
                  <img src={member.imgFace} alt={member.name} width={80} />
                  <div>{member.name}</div>
                </RoundBox>
              ))}
            </div>

            {/* 일정 (그룹+멤버 통합 최신 3개) */}
            <h4>일정</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {topSchedules.map((s, i) => (
                <RoundBox key={i}>
                  {s.owner} {s.title} - {s.sttime}
                </RoundBox>
              ))}
            </div>

            {/* 그룹 팬포스트 */}
            <h4>그룹 팬포스트</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {group.groupPostArray.slice(0, 36).map((post) => (
                <RoundBox key={post.postId} style={{ textAlign: "left" }}>
                  {post.content}
                </RoundBox>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;