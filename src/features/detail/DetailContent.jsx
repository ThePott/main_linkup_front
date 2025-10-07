import { useParams, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import useLinkUpStore from "../../shared/store/store";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import Modal from "../../package/modal/Modal.jsx";
import RoundBox from "../../package/RoundBox.jsx";
import styles from "./DetailContent.module.css";
import { format } from "date-fns";
import CustomImageBanner from "../../shared/CustomImageBanner/CustomImageBanner";
import { axiosReturnsData } from "../../shared/services/axiosInstance";
import FanPostGrid from "../../shared/FanPostGrid";
import ArtistCalendar from "../../shared/ArtistCalendar/ArtistCalendar";
import useDetailContent from "./useDetailContent";
import MyFanPostModal from "../mypage/MyFanPostModal";
import useSubscriptions from "../../shared/services/useSubscriptions";
import Container from "../../package/layout/_Container";
import { Hstack, Vstack } from "../../package/layout";
import ArtistIconBar from "../../shared/ArtistIconBar/ArtistIconBar";

const DetailContent = () => {
    const { type, id } = useParams();

    const setEventArray = useLinkUpStore((state) => state.setEventArray);
    const selectedMonthEventArray = useLinkUpStore((state) => state.selectedMonthEventArray);

    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    const setFanPostArray = useLinkUpStore((state) => state.setFanPostArray);

    const artistArray = useLinkUpStore((state) => state.artistArray);

    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const { currentArtist } = useDetailContent(id);

    const isSubscribed = artistArray.some((a) => a.artist_id === Number(id));

    const imageUrl = currentArtist?.banner_url;

    const mutataionVariables = {
        newOne: currentArtist,
        body: { artist_id: currentArtist?.id },
    };

    const { postMutation, deleteMutation } = useSubscriptions();
    const handleConfirmClick = () => {
        if (isSubscribed) {
            deleteMutation.mutate(id);
            return;
        }
        postMutation.mutate(mutataionVariables);
    };

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
        <Container>
            <Vstack gap="xl">
                {/* 1. 상단 */}
                <ArtistIconBar artistArray={artistArray} />

                {/* 2. 배너 */}
                <CustomImageBanner url={imageUrl} />

                <Hstack items="center">
                    <p className={styles.artistName}>{currentArtist?.name}</p>
                    <CustomButton
                        shape="RECTANGLE"
                        color="MONO"
                        isOn
                        onClick={() => setModalKey("subscribeModal")}
                    >
                        {isSubscribed ? "구독중" : "구독"}
                    </CustomButton>
                </Hstack>

                {/* 3. 달력 */}
                <ArtistCalendar />

                {/* 4. 최신 일정 */}
                <div className={styles.scheduleSection}>
                    {/* <h3 className={styles.scheduleTitle}>일정</h3> */}
                    <div className={styles.scheduleList}>
                        {selectedMonthEventArray.map((schedule) => {
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
                <Modal
                    isOn={modalKey === "subscribeModal"}
                    onBackgroundClick={() => setModalKey(null)}
                >
                    <div>
                        <h3>{isSubscribed ? "구독을 취소하시겠습니까?" : "구독하시겠습니까?"}</h3>
                        <CustomButton onClick={() => handleConfirmClick()}>확인</CustomButton>
                        <CustomButton onClick={() => setModalKey(null)}>취소</CustomButton>
                    </div>
                </Modal>

                <MyFanPostModal />
            </Vstack>
        </Container>
    );
};

export default DetailContent;
