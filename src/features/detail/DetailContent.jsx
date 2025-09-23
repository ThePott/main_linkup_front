import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import useLinkUpStore from "../../shared/store/store";
import Calendar from "../../package/calendar/Calendar.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import Modal from "../../package/modal/Modal.jsx"; 
import FanPostCard from "../../shared/FanpostCard.jsx"; 
import RoundBox from "../../package/RoundBox.jsx";
import CustomImageIcon from "../../shared/CustomImageIcon/CustomImageIcon.jsx";
import styles from "./DetailContent.module.css";

const DetailContent = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();

    const groupArray = useLinkUpStore((state) => state.groupArray);
    const subscribedArtistIdArray = useLinkUpStore((state) => state.subscribedArtistIdArray || []);
    const toggleSubscribe = useLinkUpStore((state) => state.toggleSubscribe);

    // 현재 URL 선택된 그룹/ 아티스트 상세 정보 
    const [selectedArtistResult, setSelectedArtistResult] = useState(null);
    // 그룹 일정 + 멤버 일정 종합
    const [mergedScheduleResultArray, setMergedScheduleResultArray] = useState([]);
    // 그룹/ 아티스트 팬포스트 배열
    const [postResultArray, setPostResultArray] = useState([]); 
    // 구독 중인 그룹/멤버 정보(스토어에서 필터링한거)
    const [subscribedArtistResultArray, setSubscribedArtistResultArray] = useState([]);
    // 구독취소 모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // 선택된 아티스트(또는 그룹) 찾기
        let selectedItem = null;
        if (type === "group") {
            selectedItem = groupArray.find((group) => group.id === Number(id));
        } else if (type === "artist") {
            selectedItem = groupArray
                .flatMap((group) => group.memberArray)
                .find((member) => member.id === Number(id));
        }
        setSelectedArtistResult(selectedItem);

        if (selectedItem) {
            // 그룹이면 그룹 일정 + 멤버 일정 합치기 / 아티스트면 해당 일정만
            const newMergedScheduleResultArray =
                type === "group"
                    ? [
                        // 그룹 일정
                        ...selectedItem.groupScheduleArray.map((schedule) => ({
                            ...schedule,
                            owner: selectedItem.name,
                        })),
                        // 멤버 일정
                        ...selectedItem.memberArray.flatMap((member) =>
                            member.scheduleArray.map((schedule) => ({
                                ...schedule,
                                owner: member.name,
                            }))
                        ),
                    ].sort((a, b) => new Date(a.sttime) - new Date(b.sttime))
                    : selectedItem.scheduleArray.map((schedule) => ({
                        ...schedule,
                        owner: selectedItem.name,
                    }));

            setMergedScheduleResultArray(newMergedScheduleResultArray);
            setPostResultArray(selectedItem.groupPostArray || selectedItem.postArray || []);
        } else {
            setMergedScheduleResultArray([]);
            setPostResultArray([]);
        }

        const subscribedItems = [
            ...groupArray,
            ...groupArray.flatMap((group) => group.memberArray),
        ].filter((item) => subscribedArtistIdArray.includes(item.id));
        setSubscribedArtistResultArray(subscribedItems);
    }, [type, id, groupArray, subscribedArtistIdArray]);

    const handleConfirmUnsubscribe = () => {
        toggleSubscribe(Number(id));
        setIsModalOpen(false);
    };

    if (!selectedArtistResult) {
        return <div>해당 {type === "group" ? "그룹" : "아티스트"}를 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.container}>
            {/* 1. 상단 */}
            <div className={styles.topBar}>
                {subscribedArtistResultArray.map((artistItem) => (
                    <div
                        key={artistItem.id}
                        onClick={() =>
                            navigate(`/detail/${artistItem.isGroup ? "group" : "artist"}/${artistItem.id}`)
                        }
                        className={styles.subscribedItem}
                    >
                        <CustomImageIcon
                            url={artistItem.imgFace}
                            alt={artistItem.name}
                            className={styles.subscribedImage}
                        />
                    </div>
                ))}

                <div className={styles.buttonRight}>
                    <CustomButton
                        shape="RECTANGLE"
                        color="MONO"
                        isOn
                        onClick={() => setIsModalOpen(true)}
                    >
                        구독중
                    </CustomButton>
                </div>
            </div>

            {/* 2. 달력 */}
            <Calendar schedules={mergedScheduleResultArray} />

            {/* 3. 최신 일정 */}
            <div className={styles.scheduleSection}>
                <h3 className={styles.scheduleTitle}>일정</h3>
                <div className={styles.scheduleList}>
                    {mergedScheduleResultArray.slice(0, 3).map((schedule, index) => (
                        <RoundBox key={index} padding="MD">
                            {schedule.owner} {schedule.title} - {schedule.sttime}
                        </RoundBox>
                    ))}
                </div>
            </div>

            {/* 4. 팬포스트 */}
            <FanPostCard
                posts={postResultArray}
                limit={24}
                cols={4}
                onClickPost={(postId) => navigate(`/post/${postId}`)}
            />

            {/* 모달 */}
            <Modal isOn={isModalOpen} onBackgroundClick={() => setIsModalOpen(false)}>
                <h3>구독을 취소하시겠습니까?</h3>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                    <CustomButton
                        shape="RECTANGLE"
                        color="RED"
                        isOn
                        onClick={handleConfirmUnsubscribe}
                    >
                        예
                    </CustomButton>
                    <CustomButton
                        shape="RECTANGLE"
                        color="MONO"
                        isOn
                        onClick={() => setIsModalOpen(false)}
                    >
                        아니요
                    </CustomButton>
                </div>
            </Modal>
        </div>
    );
};

export default DetailContent;
