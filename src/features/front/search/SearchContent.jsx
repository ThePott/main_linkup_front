import { useEffect } from "react";
import useLinkUpStore from "../../../shared/store/dummyMijin.js";
import { useNavigate } from "react-router";
import RoundBox from "../../../package/RoundBox.jsx";
import FanPostCard from "../../../shared/FanpostCard.jsx";
import CustomImageCard from "../../../shared/CustomImageCard/CustomImageCard.jsx"; 
import styles from "./SearchContent.module.css";

const SearchContent = () => {
    const navigate = useNavigate();

    const searchStatus = useLinkUpStore((state) => state.searchStatus);
    const setSearchStatus = useLinkUpStore((state) => state.setSearchStatus);

    const groupArray = useLinkUpStore((state) => state.groupArray);
    const setGroupArray = useLinkUpStore((state) => state.setGroupArray);

    const recommendedGroupArray = useLinkUpStore((state) => state.recommendedGroupArray);
    const setRecommendedGroupArray = useLinkUpStore((state) => state.setRecommendedGroupArray);

    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setSearchStatus("loading");
                const res = await fetch("http://3.35.210.2:8000/api/idol");
                const data = await res.json();
                console.log("API 호출 성공", data);

                const artists = data.artists || [];
                setGroupArray(artists);
                setRecommendedGroupArray(artists.slice(0, 2));
                setSearchStatus("success");
            } catch (err) {
                console.error("API 호출 에러:", err);
                setSearchStatus("fail");
            }
        };

        fetchGroups();
    }, [setGroupArray, setRecommendedGroupArray, setSearchStatus]);

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
                            <ArtistCard artist={group} type="FACE" imgWidth={80} />
                            <div>{group.name}</div>
                        </RoundBox>
                    ))}
                </div>
            </div>
        );
    }

    const groupArrayToShow = searchResultArray.length > 0 ? searchResultArray : groupArray;

// 검색 성공 화면
    return (
        <div className={styles.container}>
            <h2>검색 결과</h2>

            {groupArrayToShow.map((group) => {

                const combinedSchedules = [
                    ...(group.groupScheduleArray || []).map((s) => ({
                        ...s,
                        owner: group.name,
                    })),
                    ...(group.memberArray || []).flatMap((member) =>
                        (member.scheduleArray || []).map((ms) => ({
                            ...ms,
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
                                {/* 그룹 */}
                                <CustomImageCard 
                                    url={group.imgFace} 
                                    style={{ width: 160, height: 200 }} 
                                />
                                <div>{group.name}</div>
                            </div>

                            {/* 멤버들 */}
                            {(group.memberArray || []).map((member) => (
                                <div
                                    key={member.id}
                                    className={styles.clickable}
                                    onClick={() => navigate(`/detail/artist/${member.id}`)}
                                >
                                    <CustomImageCard 
                                        url={member.imgFace} 
                                        style={{ width: 160, height: 200 }} 
                                    />
                                    <div>{member.name}</div>
                                </div>
                            ))}
                        </div>

                        <h4>일정</h4>
                        <div className={styles.scheduleList}>
                            {topSchedules.map((s, i) => (
                                <RoundBox key={i}>
                                    {s.owner} {s.title} - {s.sttime}
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
}

export default SearchContent;