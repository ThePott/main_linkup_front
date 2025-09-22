import useLinkUpStore from "../../../shared/store/dummyMijin.js";
import { useNavigate } from "react-router";
import RoundBox from "../../../package/RoundBox.jsx";
import FanPostCard from "../../../shared/FanpostCard.jsx";
import styles from "./SearchContent.module.css"; 

const SearchContent = () => {
    const searchStatus = useLinkUpStore((state) => state.searchStatus);
    const recommendedGroupArray = useLinkUpStore(
        (state) => state.recommendedGroupArray
    );
    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);
    const navigate = useNavigate();

    // 검색 실패 화면
    if (searchStatus === "fail") {
        return (
            <div className={styles.container}>
                <h2>검색 결과</h2>
                <p>일치하는 결과를 찾지 못했어요.</p>
                <h3>찾으시는 그룹이 이 그룹이신가요?</h3>
                <div className={styles.recommendedContainer}>
                    {recommendedGroupArray.slice(0, 2).map((group) => (
                        <RoundBox
                            key={group.id}
                            className={styles.clickable}
                            onClick={() => navigate(`/detail/group/${group.id}`)}
                        >
                            <img src={group.imgFace} alt={group.name} width={80} />
                            <div>{group.name}</div>
                        </RoundBox>
                    ))}
                </div>
            </div>
        );
    }
    const groupArrayToShow =
        searchResultArray.length > 0
            ? searchResultArray
            : useLinkUpStore.getState().groupArray;

    // 검색 성공 화면
    return (
        <div className={styles.container}>
            <h2>검색 결과</h2>

            {groupArrayToShow.map((group) => {
                // 그룹 + 멤버 일정 합치기
                const combinedSchedules = [
                    ...group.groupScheduleArray.map((s) => ({
                        ...s,
                        owner: group.name,
                    })),
                    ...group.memberArray.flatMap((member) =>
                        member.scheduleArray.map((ms) => ({
                            ...ms,
                            owner: member.name,
                        }))
                    ),
                ].sort((a, b) => new Date(a.sttime) - new Date(b.sttime));

                const topSchedules = combinedSchedules.slice(0, 3);

                return (
                    <div key={group.id} className={styles.groupBlock}>
                        {/* 그룹 + 멤버 */}
                        <div className={styles.groupMemberRow}>
                            <RoundBox
                                className={styles.clickable}
                                onClick={() => navigate(`/detail/group/${group.id}`)}
                            >
                                <img src={group.imgFace} alt={group.name} width={80} />
                                <div>{group.name}</div>
                            </RoundBox>

                            {group.memberArray.map((member) => (
                                <RoundBox
                                    key={member.id}
                                    className={styles.clickable}
                                    onClick={() => navigate(`/detail/artist/${member.id}`)}
                                >
                                    <img src={member.imgFace} alt={member.name} width={80} />
                                    <div>{member.name}</div>
                                </RoundBox>
                            ))}
                        </div>

                        {/* 일정 */}
                        <h4>일정</h4>
                        <div className={styles.scheduleList}>
                            {topSchedules.map((s, i) => (
                                <RoundBox key={i}>
                                    {s.owner} {s.title} - {s.sttime}
                                </RoundBox>
                            ))}
                        </div>

                        {/* 그룹 팬포스트 */}
                        <h4>그룹 팬포스트</h4>
                        <FanPostCard
                            posts={group.groupPostArray}
                            limit={12}
                            cols={3}
                            onClickPost={(postId) => navigate(`/post/${postId}`)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SearchContent;