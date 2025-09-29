import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import useLinkUpStore from "../../shared/store/store";
import Calendar from "../../package/calendar/Calendar.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import Modal from "../../package/modal/Modal.jsx";
import FanPostSection from "../../shared/FanPostSection.jsx";
import RoundBox from "../../package/RoundBox.jsx";
import CustomImageIcon from "../../shared/CustomImageIcon/CustomImageIcon.jsx";
import styles from "./DetailContent.module.css";
import { format } from "date-fns";
import mockData from "../../shared/store/dummyHeehaa.json";
import CustomImageBanner from "../../shared/CustomImageBanner/CustomImageBanner";
import { axiosReturnsData } from "../../shared/services/axiosInstance";

const DetailContent = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();

    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setEventArray = useLinkUpStore((state) => state.setEventArray);

    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    const setFanPostArray = useLinkUpStore((state) => state.setFanPostArray);

    const groupArray = useLinkUpStore((state) => state.groupArray);
    const subscribedArtistIdArray = useLinkUpStore((state) => state.subscribedArtistIdArray || []);
    const toggleSubscribe = useLinkUpStore((state) => state.toggleSubscribe);

    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const isSubscribed = subscribedArtistIdArray.includes(Number(id));

    const artistArray = groupArray.flatMap(
        (groupItem) => groupItem.memberArray || []
    );
    const subscribeArray1 = mockData;
    const url = subscribeArray1[0]?.img_banner;

    useEffect(() => {
        const fetchEvents = async (params) => {
            try {
                const query = new URLSearchParams({
                    limit: 20,
                    is_active: true,
                    ...params,
                }).toString();
                const data = await axiosReturnsData("GET", `/api/events/?${query}`);
                setEventArray(data.events || []);
            } catch (err) {
                console.error("이벤트 API 호출 에러:", err);
                setEventArray([]);
            }
        };

        const fetchFanPosts = async (artistId) => {
            try {
                const query = new URLSearchParams({
                    limit: 20,
                    artist_id: artistId,
                }).toString();
                const data = await axiosReturnsData("GET", `/api/posts/?${query}`);
                const posts = data.map((post) => ({
                    postId: post.id,
                    imgUrl: post.image_url || null,
                    title: post.content,
                    likes: post.likes_count ?? 0,
                }));
                setFanPostArray(posts);
            } catch (err) {
                console.error("팬포스트 API 호출 에러:", err);
                setFanPostArray([]);
            }
        };

        if (type === "group") {
            fetchEvents({ artist_parent_group: id });
            fetchFanPosts(id);
        } else if (type === "artist") {
            fetchEvents({ artist_id: id });
            fetchFanPosts(id);
        }
    }, [type, id, setEventArray, setFanPostArray]);

    return (
        <div className={styles.container}>
            {/* 1. 상단 */}
            <div className={styles.topBar}>
                {artistArray.map((artist) => (
                    <CustomImageIcon
                        key={artist.artist_id}
                        url={artist.artist_image_url}
                        className={styles.circleIcon}
                        onClick={() => {
                            navigate(`/detail/artist/${artist.artist_id}`);
                        }}
                    />
                ))}
                <div className={styles.buttonRight}>
                    <CustomButton
                        shape="RECTANGLE"
                        color={isSubscribed ? "MONO" : "PRIMARY"}
                        isOn
                        onClick={() => setModalKey("subscribeModal")}
                    >
                        {isSubscribed ? "구독중" : "구독"}
                    </CustomButton>
                </div>
            </div>

            {/* 2. 배너 */}
            <RoundBox className={styles.bannerContainer}>
                <CustomImageBanner url={url} className={styles.banner} />
            </RoundBox>

            {/* 3. 달력 */}
            <Calendar schedules={eventArray} />

            {/* 4. 최신 일정 */}
            <div className={styles.scheduleSection}>
                <h3 className={styles.scheduleTitle}>일정</h3>
                <div className={styles.scheduleList}>
                    {eventArray.map((schedule) => {
                        const dateOnly = format(new Date(schedule.start_time), "yyyy-MM-dd");
                        return (
                            <RoundBox key={schedule.id}>
                                {schedule.title} — {dateOnly}
                            </RoundBox>
                        );
                    })}
                </div>
            </div>

            {/* 5. 팬포스트 */}
            <FanPostSection
                posts={fanPostArray}
                limit={24}
                cols={4}
                onClickPost={(postId) => navigate(`/post/${postId}`)}
            />

            {/* 6. 모달 */}
            <Modal
                isOn={modalKey === "subscribeModal"}
                onBackgroundClick={() => setModalKey(null)}
            >
                <div>
                    <h3>{isSubscribed ? "구독을 취소하시겠습니까?" : "구독하시겠습니까?"}</h3>
                    <CustomButton
                        onClick={() => {
                            toggleSubscribe(Number(id));
                            setModalKey(null);
                        }}
                    >
                        확인
                    </CustomButton>
                    <CustomButton onClick={() => setModalKey(null)}>취소</CustomButton>
                </div>
            </Modal>
        </div>
    );
};

export default DetailContent;