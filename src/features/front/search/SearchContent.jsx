import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useLinkUpStore from "../../../shared/store/store";
import RoundBox from "../../../package/RoundBox.jsx";
import FanPostSection from "../../../shared/FanPostSection.jsx";
import styles from "./SearchContent.module.css";
import ArtistCardNew from "../../../shared/ArtistCardNew/ArtistCardNew";
import GridCardContainer from "../../../shared/GridCardContainer/GridCardContainer";
import { format } from "date-fns";

const SearchContent = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";

    const setGroupArray = useLinkUpStore((state) => state.setGroupArray);
    const recommendedGroupArray = useLinkUpStore((state) => state.recommendedGroupArray);
    const setRecommendedGroupArray = useLinkUpStore((state) => state.setRecommendedGroupArray);
    const searchResultArray = useLinkUpStore((state) => state.searchResultArray);
    const setSearchResultArray = useLinkUpStore((state) => state.setSearchResultArray);

    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setEventArray = useLinkUpStore((state) => state.setEventArray);

    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    const setFanPostArray = useLinkUpStore((state) => state.setFanPostArray);

    useEffect(() => {
        const fetchGroupsAndEvents = async () => {
            try {
                if (queryParam) {
                    const res = await fetch(`http://3.35.210.2:8000/api/idol/${queryParam}`);
                    const artist = await res.json();

                    if (artist.artist_type === "individual" && artist.group_name) {
                        const groupRes = await fetch(
                            `http://3.35.210.2:8000/api/idol/${artist.group_name}`
                        );
                        const groupData = await groupRes.json();
                        setSearchResultArray([groupData]);
                        await fetchEvents({ artist_parent_group: groupData.id });
                        await fetchFanPosts(groupData.id);
                    } else {
                        setSearchResultArray([artist]);
                        await fetchEvents({ artist_id: artist.id });
                        await fetchFanPosts(artist.id); 
                    }
                } else {
                    const res = await fetch(
                        "http://3.35.210.2:8000/api/idol?artist_type=group&limit=20&page=1"
                    );
                    const data = await res.json();
                    const artists = data.artists || [];
                    setGroupArray(artists);
                    setRecommendedGroupArray(artists);
                    setSearchResultArray([]);
                    setEventArray([]);
                    setFanPostArray([]);
                }
            } catch (err) {
                console.error("API 호출 에러:", err);
            }
        };

        const fetchEvents = async (params) => {
            try {
                const query = new URLSearchParams({
                    limit: 20,
                    is_active: true,
                    ...params
                }).toString();
                const res = await fetch(`http://3.35.210.2:8000/events/?${query}`);
                const data = await res.json();
                const events = data.events || [];
                setEventArray(events);
            } catch (err) {
                console.error("이벤트 API 호출 에러:", err);
                setEventArray([]);
            }
        };

        const fetchFanPosts = async (artistId) => {
            try {
                const query = new URLSearchParams({ limit: 20, artist_id: artistId }).toString();
                const res = await fetch(`http://3.35.210.2:8000/api/posts/?${query}`);
                const data = await res.json();
                const posts = data.map((post) => ({
                    postId: post.id,
                    imgUrl: post.image_url ?? "",
                    likes: post.likes_count
                }));
                setFanPostArray(posts);
            } catch (err) {
                console.error("팬포스트 API 호출 에러:", err);
                setFanPostArray([]);
            }
        };

        fetchGroupsAndEvents();
    }, [queryParam]);

    if (queryParam && searchResultArray.length === 0) {
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
                            <img src={group.imgFace} alt={group.name} width={80} />
                            <div>{group.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (searchResultArray.length > 1) {
        return (
            <div className={styles.container}>
                <h2>검색 결과</h2>
                <GridCardContainer>
                    {searchResultArray.map((artist) => (
                        <ArtistCardNew key={artist.id} artist={artist} />
                    ))}
                </GridCardContainer>
            </div>
        );
    }

    const groupMemberArray = [];
    const groupThenMemberArray = [...searchResultArray, ...groupMemberArray];

    return (
        <div className={styles.container}>
            <h2>검색 결과</h2>

            <GridCardContainer>
                {groupThenMemberArray.map((artist) => (
                    <ArtistCardNew key={artist.id} artist={artist} />
                ))}
            </GridCardContainer>

            <h4>일정</h4>

            <div className={styles.scheduleList}>
                {eventArray.slice(0, 3).map((schedule) => {
                    const dateOnly = format(new Date(schedule.start_time), "yyyy-MM-dd");
                    return (
                        <RoundBox key={schedule.id}>
                            {schedule.title} — {dateOnly}
                        </RoundBox>
                    );
                })}
            </div>

            <h4>그룹 팬포스트</h4>

            <FanPostSection
                posts={fanPostArray}
                limit={12}
                cols={3}
                onClickPost={(postId) => navigate(`/post/${postId}`)}
            />
        </div>
    );
};

export default SearchContent;