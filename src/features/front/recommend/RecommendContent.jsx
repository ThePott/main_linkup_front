import { useQuery } from "@tanstack/react-query";
import GridContainer from "../../../package/gridContainer/GridContainer";
import axiosInstance from "../../../shared/services/axiosInstance";
import SuggestedCard from "../../../shared/SuggestedCard";
import styles from "./RecommendContent.module.css";

const RecommendContent = () => {
    const getArtists = async () => {
        const res = await axiosInstance.get("/api/idol");
        return res.data;
    };

    const {
        isPending,
        error,
        data: artistsArray,
    } = useQuery({
        queryKey: ["idol"],
        queryFn: () => getArtists(),
        staleTime: 1000 * 60 * 3,
    });

    if (isPending) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>알 수 없는 오류가 발생했습니다.</p>;

    return (
        <div className={styles.container}>
            <GridContainer cols="auto" colMinWidth="200px">
                {artistsArray.map((artist) => (
                    <SuggestedCard key={artist.id} artist={artist} />
                ))}
            </GridContainer>
        </div>
    );
};

export default RecommendContent;
