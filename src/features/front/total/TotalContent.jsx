import Calendar from "../../../package/calendar/Calendar";
import RoundBox from "../../../package/RoundBox";
import CustomImageBanner from "../../../shared/CustomImageBanner/CustomImageBanner";
import CustomImageIcon from "../../../shared/CustomImageIcon/CustomImageIcon";
import styles from "./TotalContent.module.css";
import mockData from "../../../shared/store/dummyHeehaa.json";
import axiosInstance from "../../../shared/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomButton from "../../../package/customButton/CustomButton";
import { useNavigate } from "react-router";

// CustomImageIcon - 구독 api와 연결이 필요.
// 현재 artist_id는 undefined임 mockdata로 연결되어 있기 때문
// 구독한 아이돌의 일정을 가져와야 하는데 우선은 /events/ 주소로 연결하여
// 일정 가져옴 - 구독에 따른 일정을 가져와야 하기때문에 로직 추가가 필요할 거 같음

const TotalContent = () => {
    const subscribeArray1 = mockData;
    const url = subscribeArray1[0].img_banner;

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const getSchedule = async () => {
        const res = await axiosInstance.get("events");
        return res.data.events;
    };

    const {
        isPending,
        error,
        data: subscribeArray,
    } = useQuery({
        queryKey: ["events"],
        queryFn: () => getSchedule(),
        staleTime: 1000 * 60 * 3,
    });

    if (isPending) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>알 수 없는 오류가 발생했습니다.</p>;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = subscribeArray?.slice(startIndex, endIndex) ?? [];
    const totalPages = Math.ceil((subscribeArray?.length ?? 0) / itemsPerPage);

    return (
        // unique key가 필요 - 커스텀이미지아이콘 & currentItems
        <div className={styles.container}>
            {subscribeArray1.map((artist) => (
                <CustomImageIcon
                    key={artist.id}
                    url={artist.img_face}
                    className={styles.circleIcon}
                    onClick={() => {
                        navigate(`/detail/artist/${artist.artist_id}`);
                    }}
                />
            ))}
            <RoundBox className={styles.bannerContainer}>
                <CustomImageBanner url={url} className={styles.banner} />
            </RoundBox>
            <p className={styles.text}>스케줄</p>
            <section className={styles.calendarContainer}>
                <Calendar className={styles.calendar} />
                <span className={styles.dailyScheduleContainer}>
                    {currentItems.map((schedule) => (
                        <RoundBox
                            className={styles.dailySchedyleRoundbox}
                            key={schedule.id}
                        >
                            <li className={styles.dailySchedule}>
                                <span className={styles.date}>
                                    {schedule.start_time.slice(0, 10)}
                                </span>
                                <span className={styles.scheduleTitle}>
                                    {schedule.title}
                                </span>
                            </li>
                        </RoundBox>
                    ))}

                    <div className={styles.btns}>
                        <CustomButton
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                        >
                            이전
                        </CustomButton>
                        <span>
                            {page} / {totalPages}
                        </span>
                        <CustomButton
                            onClick={() =>
                                setPage((p) => Math.min(p + 1, totalPages))
                            }
                            disabled={page === totalPages}
                        >
                            다음
                        </CustomButton>
                    </div>
                </span>
            </section>
        </div>
    );
};

export default TotalContent;
