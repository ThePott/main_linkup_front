import RoundBox from "../../../package/RoundBox";
import CustomImageBanner from "../../../shared/CustomImageBanner/CustomImageBanner";
import CustomImageIcon from "../../../shared/CustomImageIcon/CustomImageIcon";
import styles from "./TotalContent.module.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomButton from "../../../package/customButton/CustomButton";
import { useNavigate } from "react-router";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import useLinkUpStore from "../../../shared/store/store";
import { Vstack } from "../../../package/layout";
import ArtistCalendar from "../../../shared/ArtistCalendar/ArtistCalendar";

const TotalContent = () => {
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const endpoint = "/api/events";
    const {
        isPending,
        error,
        data: scheduleArray,
    } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
        onError: (error) => console.error(error),
    });

    if (isPending) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>알 수 없는 오류가 발생했습니다.</p>;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = scheduleArray.events?.slice(startIndex, endIndex) ?? [];
    const totalPages = Math.ceil((scheduleArray.events?.length ?? 0) / itemsPerPage);

    //배너 이미지 api가 모호하여 임의로 지정
    const url = artistArray[0].artist_image_url;

    return (
        <div className={styles.container}>
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
            <RoundBox className={styles.bannerContainer}>
                <CustomImageBanner url={url} className={styles.banner} />
            </RoundBox>
            <p className={styles.text}>스케줄</p>
            <section className={styles.calendarContainer}>
                <ArtistCalendar isMedium={true} />
                <Vstack className={styles.dailyScheduleContainer}>
                    {currentItems.map((schedule) => (
                        <RoundBox className={styles.dailySchedyleRoundbox} key={schedule.id}>
                            <li className={styles.dailySchedule}>
                                <span className={styles.date}>
                                    {schedule.start_time.slice(0, 10)}
                                </span>
                                <span className={styles.scheduleTitle}>{schedule.title}</span>
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
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            다음
                        </CustomButton>
                    </div>
                </Vstack>
            </section>
        </div>
    );
};

export default TotalContent;
