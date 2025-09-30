import { useParams, useNavigate } from "react-router";
import { useEffect, useRef } from "react"; // useRef 추가
import useLinkUpStore from "../../shared/store/store";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import Modal from "../../package/modal/Modal.jsx";
import RoundBox from "../../package/RoundBox.jsx";
import CustomImageIcon from "../../shared/CustomImageIcon/CustomImageIcon.jsx";
import styles from "./DetailContent.module.css";
import { format } from "date-fns";
import CustomImageBanner from "../../shared/CustomImageBanner/CustomImageBanner";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import FanPostGrid from "../../shared/FanPostGrid";
import ArtistCalendar from "../../shared/ArtistCalendar/ArtistCalendar";

const getSubscriptions = async () => {
    const data = await axiosReturnsData("GET", "/api/subscriptions/?include_image=true");
    useLinkUpStore.setState({ artistArray: data });
};

const DetailContent = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();

    const eventArray = useLinkUpStore((state) => state.eventArray);
    const setEventArray = useLinkUpStore((state) => state.setEventArray);

    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    const setFanPostArray = useLinkUpStore((state) => state.setFanPostArray);

    const artistArray = useLinkUpStore((state) => state.artistArray);

    const toggleSubscribe = useLinkUpStore((state) => state.toggleSubscribe);

    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const isSubscribed = artistArray.some((a) => a.artist_id === Number(id));

    const currentArtist = artistArray.find((a) => a.artist_id === Number(id));
    const imageUrl = currentArtist?.banner_url;

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
    };

    useEffect(() => {
        getSubscriptions();
    }, []);

    useEffect(() => {
        const fetchEvents = async (params) => {
            try {
                const query = new URLSearchParams({
                    limit: 20,
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
                    artist_id: Number(artistId),
                }).toString();
                const data = await axiosReturnsData("GET", `/api/posts/?${query}`);
                setFanPostArray(data);
            } catch (err) {
                console.error("팬포스트 API 호출 에러:", err);
                setFanPostArray([]);
            }
        };

        fetchEvents({ artist_id: id });
        fetchFanPosts(id);
    }, [type, id, setEventArray, setFanPostArray]);

    return (
        <div className={styles.container}>
            {/* 1. 상단 */}
            <div className={styles.topBar}>
                <button className={styles.arrow} onClick={scrollLeft}>
                    &lt;
                </button>

                <div className={styles.iconWrapper} ref={scrollRef}>
                    {artistArray.map((artistItem) => (
                        <CustomImageIcon
                            key={artistItem.artist_id}
                            url={artistItem.artist_image_url}
                            className={styles.circleIcon}
                            onClick={() => navigate(`/detail/artist/${artistItem.artist_id}`)}
                        />
                    ))}
                </div>
                <button className={styles.arrow} onClick={scrollRight}>
                    &gt;
                </button>

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
                <CustomImageBanner url={imageUrl} className={styles.banner} />
            </RoundBox>

            {/* 3. 달력 */}
            <ArtistCalendar />

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
            <FanPostGrid fanPostArray={fanPostArray} isBlurred={!isSubscribed} />

            {/* 6. 모달 */}
            <Modal isOn={modalKey === "subscribeModal"} onBackgroundClick={() => setModalKey(null)}>
                <div>
                    <h3>{isSubscribed ? "구독을 취소하시겠습니까?" : "구독하시겠습니까?"}</h3>
                    <CustomButton
                        onClick={async () => {
                            await toggleSubscribe(Number(id));
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