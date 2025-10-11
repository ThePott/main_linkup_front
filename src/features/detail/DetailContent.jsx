import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import useLinkUpStore from "../../shared/store/store";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import Modal from "../../package/modal/Modal.jsx";
import styles from "./DetailContent.module.css";
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
import ConfirmationModal from "../../package/modal/ConfirmationModal";
import GridContainer from "../../package/gridContainer/GridContainer";
import EventBox from "../../package/eventBox/EventBox";

const DetailContent = () => {
    const { type, id } = useParams();

    const setEventArray = useLinkUpStore((state) => state.setEventArray);
    const selectedMonthEventArray = useLinkUpStore((state) => state.selectedMonthEventArray);

    const fanPostArray = useLinkUpStore((state) => state.fanPostArray);
    const setFanPostArray = useLinkUpStore((state) => state.setFanPostArray);

    const user = useLinkUpStore((state) => state.user);
    const artistArray = useLinkUpStore((state) => state.artistArray);

    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);

    const navigate = useNavigate();

    const { currentArtist } = useDetailContent(id);

    const isSubscribed =
        user && artistArray.length !== 0 && artistArray.some((a) => a.artist_id === Number(id));

    const imageUrl = currentArtist?.banner_url;

    const mutataionVariables = {
        newOne: currentArtist,
        body: { artist_id: currentArtist?.id },
    };

    const { postMutation, deleteMutation } = useSubscriptions();
    const handleConfirmClick = () => {
        setModalKey(null);

        if (isSubscribed) {
            deleteMutation.mutate(id);
            return;
        }

        if (!user) {
            navigate("/login");
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
                const data = await axiosReturnsData("GET", `/api/events?${query}`);
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
                const data = await axiosReturnsData("GET", `/api/posts?${query}`);
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
        <>
            {/* 6. 모달 */}
            <MyFanPostModal />

            <ConfirmationModal
                isOn={modalKey === "subscribeForFanPost"}
                onBackgroundClick={() => setModalKey(null)}
            >
                <ConfirmationModal.TextGroup>
                    <ConfirmationModal.Title>구독하시겠습니까?</ConfirmationModal.Title>
                    <ConfirmationModal.Description>
                        팬 포스트를 보기 위해서는 구독을 해야 합니다
                    </ConfirmationModal.Description>
                </ConfirmationModal.TextGroup>
                <GridContainer cols={2}>
                    <CustomButton onClick={() => setModalKey(null)}>취소</CustomButton>
                    <CustomButton onClick={() => handleConfirmClick()}>구독</CustomButton>
                </GridContainer>
            </ConfirmationModal>

            <Modal isOn={modalKey === "subscribeModal"} onBackgroundClick={() => setModalKey(null)}>
                <div>
                    <h3>{isSubscribed ? "구독을 취소하시겠습니까?" : "구독하시겠습니까?"}</h3>
                    <CustomButton onClick={() => handleConfirmClick()}>확인</CustomButton>
                    <CustomButton onClick={() => setModalKey(null)}>취소</CustomButton>
                </div>
            </Modal>

            <Container>
                <Vstack gap="xl">
                    {/* 1. 상단 */}
                    <ArtistIconBar artistArray={artistArray} />

                    {/* 2. 배너 */}
                    <CustomImageBanner url={imageUrl} />

                    <Hstack items="center">
                        <p className={styles.artistName}>{currentArtist?.name}</p>
                        {user && (
                            <CustomButton
                                shape="RECTANGLE"
                                color="MONO"
                                isOn={!isSubscribed}
                                onClick={() => setModalKey("subscribeModal")}
                            >
                                {isSubscribed ? "구독중" : "구독"}
                            </CustomButton>
                        )}
                    </Hstack>

                    {/* 3. 달력 */}
                    <ArtistCalendar />

                    {/* 4. 최신 일정 */}
                    <GridContainer cols={2}>
                        {selectedMonthEventArray.map((event) => (
                            <EventBox key={event.id} event={event} />
                        ))}
                    </GridContainer>

                    {/* 5. 팬포스트 */}
                    <FanPostGrid fanPostArray={fanPostArray} isBlurred={!isSubscribed} />
                </Vstack>
            </Container>
        </>
    );
};

export default DetailContent;
