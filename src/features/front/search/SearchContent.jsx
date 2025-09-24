import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useLinkUpStore from "../../../shared/store/store";
import RoundBox from "../../../package/RoundBox.jsx";
import FanPostSection from "../../../shared/FanPostSection.jsx";
import styles from "./SearchContent.module.css";
import ArtistCardNew from "../../../shared/ArtistCardNew/ArtistCardNew";
import GridCardContainer from "../../../shared/GridCardContainer/GridCardContainer";

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
                if (queryParam) {
                    const res = await fetch(`http://3.35.210.2:8000/api/idol/${queryParam}`);
                    const artist = await res.json();

                    if (artist.artist_type === "individual" && artist.group_name) {
                        const groupRes = await fetch(
                            `http://3.35.210.2:8000/api/idol/${artist.group_name}`,
                        );
                        const groupData = await groupRes.json();
                        setSearchResultArray([groupData]);
                    } else {
                        setSearchResultArray([artist]);
                    }
                } else {
                    const res = await fetch(
                        "http://3.35.210.2:8000/api/idol?artist_type=group&limit=20&page=1",
                    );
                    const data = await res.json();
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

    if (searchResultArray.lengh > 1) {
        return (
            <div className={styles.container}>
                <h2>검색 결과</h2>
                <GridCardContainer>
                    {searchResultArray.map((artist) => (
                        <ArtistCardNew artist={artist} />
                    ))}
                </GridCardContainer>
            </div>
        );
    }

    const eventArray = [
        "스케줄은",
        "events api를 이용해서",
        "받아오셔야 합니다",
        "스토어에 저장된",
        "eventArray를 활용해주세요",
    ];

    const fanPostArray = []; // api로 받아오셔야 합니다

    // 검색 성공 결과가 그룹인지 멤버인지 확인하셔야 합니다. 그룹이다 -> 추가 api 요청, 멤버이다 -> 불필요할 듯합니다?
    const groupMemberArray = []; // api로 따로 받아오셔야 합니다
    const groupThenMemberArray = [...searchResultArray, ...groupMemberArray];

    return (
        <div className={styles.container}>
            <h2>검색 결과</h2>

            <GridCardContainer>
                {groupThenMemberArray.map((artist) => (
                    <ArtistCardNew artist={artist} />
                ))}
            </GridCardContainer>

            <h4>일정</h4>

            <div className={styles.scheduleList}>
                {eventArray.map((schedule, index) => (
                    <RoundBox key={index}>
                        {schedule}
                        {/* {schedule.owner} {schedule.title} - {schedule.sttime} */}
                    </RoundBox>
                ))}
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
