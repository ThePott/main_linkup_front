import { useQuery } from "@tanstack/react-query";
import { axiosReturnsData } from "../../../shared/services/axiosInstance";
import SuggestedCard from "../../../shared/SuggestedCard";
import styles from "./RecommendContent.module.css";
import { useEffect } from "react";
import useLinkUpStore from "../../../shared/store/store";
import GridCardContainer from "../../../shared/GridCardContainer/GridCardContainer";

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
        onError: (error) => {
            console.error(error);
        },
    });

    useEffect(() => {
        // 항상 배열로만 저장
        const result = data && Array.isArray(data.artists) ? data.artists : [];
        setRecommendArtistArray(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (isPending) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>알 수 없는 오류가 발생했습니다.</p>;

    return (
        <div className={styles.container}>
            <GridCardContainer>
                {(recommendArtistArray || []).map((artist) => (
                    <SuggestedCard key={artist.id} artist={artist} />
                ))}
            </GridCardContainer>
        </div>
    );
};

export default RecommendContent;
