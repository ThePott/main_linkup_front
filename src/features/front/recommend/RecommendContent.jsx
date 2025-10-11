import { useQuery } from "@tanstack/react-query";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import SuggestedCard from "../../../shared/SuggestedCard";
import styles from "./RecommendContent.module.css";
import { useEffect } from "react";
import useLinkUpStore from "../../../shared/store/store";
import RoundBox from "../../../package/RoundBox";
import ErrorComponent from "../../../package/ErrorComponent";
import RecommendContentSkeleton from "./RecommendContentSkeleton";
import GridCardContainer from "../../../shared/GridCardContainer/GridCardContainer";
import Container from "../../../package/layout/_Container";

const RecommendContent = () => {
    const recommendArtistArray = useLinkUpStore((state) => state.recommendArtistArray);
    const setRecommendArtistArray = useLinkUpStore((state) => state.setRecommendArtistArray);

    const endpoint = "/api/idol";
    const { isPending, error, data } = useQuery({
        queryKey: [endpoint],
        queryFn: () => axiosReturnsData("GET", endpoint),
        // stale time은 query client에서 5분으로 설정했습니다.
        // 만약 달리 사용하고 싶으시면 기존처럼 useQuery에 직접 세팅하셔도 됩니다.
        // staleTime: 1000 * 60 * 3,
    });

    useEffect(() => {
        // 항상 배열로만 저장
        const result = data && Array.isArray(data.artists) ? data.artists : [];
        setRecommendArtistArray(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (isPending)
        return (
            <div className={styles.container}>
                <RecommendContentSkeleton />
            </div>
        );
    if (error)
        return (
            <RoundBox className={styles.roundboxContainer}>
                <ErrorComponent />
            </RoundBox>
        );

    return (
        <Container>
            <GridCardContainer>
                {(recommendArtistArray || []).map((artist) => (
                    <SuggestedCard key={artist.id} artist={artist} />
                ))}
            </GridCardContainer>
        </Container>
    );
};

export default RecommendContent;
