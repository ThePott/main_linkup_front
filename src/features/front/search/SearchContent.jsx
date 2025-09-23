import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useLinkUpStore from "../../../shared/store/dummyMijin.js";
import RoundBox from "../../../package/RoundBox.jsx";
import FanPostCard from "../../../shared/FanpostCard.jsx";
import CustomImageCard from "../../../shared/CustomImageCard/CustomImageCard.jsx";
import styles from "./SearchContent.module.css";

const SearchContent = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";

    const setGroupArray = useLinkUpStore((state) => state.setGroupArray);
    const recommendedGroupArray = useLinkUpStore((state) => state.recommendedGroupArray);
    const setRecommendedGroupArray = useLinkUpStore((state) => state.setRecommendedGroupArray);
    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);
    const setSearchResultArray = useLinkUpStore((state) => state.setSearchResultArray);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const url = queryParam
                    ? `http://3.35.210.2:8000/api/idol/${queryParam}`
                    : "http://3.35.210.2:8000/api/idol";

                const res = await fetch(url);
                const data = await res.json();

                if (queryParam) {
                    setSearchResultArray([data]);
                } else {
                    const artists = data.artists || [];
                    setGroupArray(artists);
                    setRecommendedGroupArray(artists); 
                    setSearchResultArray([]); 
                }
            } catch (err) {
                console.error("API 호출 에러:", err);
            }
        };

        fetchGroups();
    }, [queryParam]); 

    if (!queryParam && searchResultArray.length === 0) {
        return (
            <div className={styles.container}>
                <h2>검색 결과</h2>
                <p>일치하는 결과를 찾지 못했어요.</p>
                <h3>추천 그룹</h3>
                <div className={styles.recommendedContainer}>
                    {recommendedGroupArray.map((group) => (
                        <div
                            key={group.id}
                            className={styles.clickable}
                            onClick={() => navigate(`/detail/group/${group.id}`)}
                        >
                            <CustomImageCard
                                url={group.profile_image || group.imgFace}
                                style={{ width: 160, height: 200 }}
                            />
                            <div>{group.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const groupArrayToShow = searchResultArray;

    return (
        <div className={styles.container}>
            <h2>검색 결과</h2>
            {groupArrayToShow.map((group) => {
                const combinedSchedules = [
                    ...(group.groupScheduleArray || []).map((schedule) => ({
                        ...schedule,
                        owner: group.name,
                    })),
                    ...(group.memberArray || []).flatMap((member) =>
                        (member.scheduleArray || []).map((memberSchedule) => ({
                            ...memberSchedule,
                            owner: member.name,
                        }))
                    ),
                ].sort((a, b) => new Date(a.sttime) - new Date(b.sttime));

                const topSchedules = combinedSchedules.slice(0, 3);

                return (
                    <div key={group.id} className={styles.groupBlock}>
                        <div className={styles.groupMemberRow}>
                            <div
                                className={styles.clickable}
                                onClick={() => navigate(`/detail/group/${group.id}`)}
                            >
                                <CustomImageCard
                                    url={group.profile_image || group.imgFace}
                                    style={{ width: 160, height: 200 }}
                                />
                                <div>{group.name}</div>
                            </div>

                            {(group.memberArray || []).map((member) => (
                                <div
                                    key={member.id}
                                    className={styles.clickable}
                                    onClick={() => navigate(`/detail/artist/${member.id}`)}
                                >
                                    <CustomImageCard
                                        url={member.profile_image || member.imgFace}
                                        style={{ width: 160, height: 200 }}
                                    />
                                    <div>{member.name}</div>
                                </div>
                            ))}
                        </div>

                        <h4>일정</h4>
                        <div className={styles.scheduleList}>
                            {topSchedules.map((schedule, index) => (
                                <RoundBox key={index}>
                                    {schedule.owner} {schedule.title} - {schedule.sttime}
                                </RoundBox>
                            ))}
                        </div>

                        <h4>그룹 팬포스트</h4>
                        <FanPostCard
                            posts={group.groupPostArray || []}
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