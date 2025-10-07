import RoundBox from "../../../package/RoundBox";
import styles from "./TotalContent.module.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CustomButton from "../../../package/customButton/CustomButton";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import useLinkUpStore from "../../../shared/store/store";
import { Vstack } from "../../../package/layout";
import ArtistCalendar from "../../../shared/ArtistCalendar/ArtistCalendar";
import useSubscriptions from "../../../shared/services/useSubscriptions";
import Container from "../../../package/layout/_Container";
import ArtistIconBar from "../../../shared/ArtistIconBar/ArtistIconBar";
import GridContainer from "../../../package/gridContainer/GridContainer";
import EventBox from "../../../package/eventBox/EventBox";
import FanPostGrid from "../../../shared/FanPostGrid";
import MyFanPostModal from "../../mypage/MyFanPostModal";

const TotalContent = () => {
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const scheduleArray = useLinkUpStore((state) => state.selectedMonthEventArray);
    const setEventArray = useLinkUpStore((state) => state.setEventArray);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    useSubscriptions();

    const endpoint = "/api/events/subscribed";
    const { isPending, error, data } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
        // V5에서 삭제되었습니다
        // onError: (error) => console.error(error),
    });

    const fanPostEndpoint = "/api/posts?is_active=true";
    const { data: fanPostArray } = useQuery({
        queryKey: [fanPostEndpoint],
        queryFn: () => axiosReturnsData("GET", fanPostEndpoint),
        // V5에서 삭제되었습니다
        // onError: (error) => console.error(error),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setEventArray(data.events);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (isPending) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>알 수 없는 오류가 발생했습니다.</p>;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = scheduleArray.slice(startIndex, endIndex) ?? [];
    const totalPages = Math.ceil((scheduleArray.length ?? 0) / itemsPerPage);

    return (
        <>
            <Container>
                <Vstack gap="xl">
                    <ArtistIconBar artistArray={artistArray} />
                    <GridContainer cols={2}>
                        <ArtistCalendar isMedium={true} />
                        <Vstack className={styles.dailyScheduleContainer}>
                            {currentItems.map((schedule) => (
                                <EventBox key={schedule.id} event={schedule} />
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
                    </GridContainer>
                    <FanPostGrid fanPostArray={fanPostArray ?? []} isBlurred={false} />
                </Vstack>
            </Container>
            <MyFanPostModal />
        </>
    );
};

export default TotalContent;
