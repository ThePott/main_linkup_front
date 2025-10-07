import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../features/mypage/Sidebar.jsx";
import RoundBox from "../package/RoundBox.jsx";
import DeleteAccountModal from "../features/mypage/DeleteAccountModal.jsx";
import useLinkUpStore from "../shared/store/store";
import { apiAuthMe } from "../shared/services/linkupApi.js";
import styles from "./MyPage.module.css";
import MyFanPost from "../features/mypage/MyFanPost.jsx";
import Container from "../package/layout/_Container.jsx";
import Hstack from "../package/layout/_Hstack.jsx";
import Vstack from "../package/layout/_Vstack.jsx";
import FlexOneContainer from "../package/flexOneContainer/FlexOneContainer.jsx";
import CustomImageIcon from "../shared/CustomImageIcon/CustomImageIcon.jsx";
import ImageInput from "../package/imageInput/ImageInput.jsx";
import CustomImageContainer from "../package/customImage/CustomImageContainer.jsx";
import { axiosReturnsData } from "../shared/services/axiosInstance.js";
import CustomInput from "../package/CustomInput.jsx";

// 내 포스트 API
const fetchMyPosts = async ({ queryKey }) => {
    const [, accessToken, userId] = queryKey;
    if (!accessToken || !userId) return [];

    const res = await fetch(`/api/posts?limit=100&offset=0`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error("포스트 불러오기 실패");
    const posts = await res.json();
    return posts.filter((post) => post.user.id === userId);
};

// 내 구독 목록 API
const fetchSubscriptions = async ({ queryKey }) => {
    const [, accessToken] = queryKey;
    if (!accessToken) return [];

    const res = await fetch("/api/subscriptions/", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error("구독 목록 불러오기 실패");
    const data = await res.json();
    return data.filter((sub) => sub.is_active);
};

const MyPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const accessToken = useLinkUpStore((state) => state.access_token);

    // 사용자 정보
    const { data: userInfo, isLoading: isUserLoading } = useQuery({
        queryKey: ["userInfo", accessToken],
        queryFn: async () => await apiAuthMe("GET"),
        enabled: !!accessToken,
    });

    // 내 포스트
    const { data: myPosts = [], isFetching: isPostsFetching } = useQuery({
        queryKey: ["myPosts", accessToken, userInfo?.id],
        queryFn: fetchMyPosts,
        enabled: !!accessToken && !!userInfo,
        // refetchInterval: 5000, // 주석 처리: 서버 요청 최소화
        keepPreviousData: true, // 이전 데이터 유지
    });

    // 내 구독 (실시간 갱신 제거)
    const { data: subscriptions = [] } = useQuery({
        queryKey: ["subscriptions", accessToken],
        queryFn: fetchSubscriptions,
        enabled: !!accessToken,
        // refetchInterval: 5000, // 주석 처리: 서버 요청 최소화
        keepPreviousData: true,
    });

    if (!accessToken) return <div>로그인이 필요합니다.</div>;
    if (isUserLoading) return <div>로딩 중...</div>; // 사용자 정보만 로딩 표시

    // 통계
    const subscriptionsCount = subscriptions.length;
    const postsCount = myPosts.length;
    const likesCount = myPosts.reduce((sum, post) => sum + (post.likes_count ?? 0), 0);

    const handleImageChange = (event) => {
        const body = new FormData(event.currentTarget);
        axiosReturnsData("PUT", "/api/auth/me", body);
    };

    const handleNicknameBlur = (event) => {
        const nickname = event.target.value;
        if (!nickname) {
            event.target.value = userInfo?.nickname;
            return;
        }
        axiosReturnsData("PUT", `/api/auth/me?nickname=${nickname}`);
    };

    return (
        <Container>
            <Vstack>
                {/* 사용자 프로필 */}
                <Hstack items="center">
                    <CustomImageContainer shape="CIRCLE" height="xs">
                        <form onChange={handleImageChange}>
                            <ImageInput
                                name="profile_image"
                                defaultSrc={
                                    userInfo.profile_image_url ||
                                    import.meta.env.VITE_PLACEHOLDER_IMAGE
                                }
                            />
                        </form>
                    </CustomImageContainer>
                    <div className={styles.userInfo}>
                        <CustomInput
                            defaultValue={userInfo?.nickname}
                            onBlur={handleNicknameBlur}
                        />
                        <div className={styles.userStats}>
                            <span>구독: {subscriptionsCount}</span>
                            <span>포스트: {postsCount}</span>
                            <span>좋아요: {likesCount}</span>
                            {isPostsFetching && <small>갱신 중...</small>}
                        </div>
                    </div>
                </Hstack>

                <Hstack gap="xl">
                    {/* 본문 영역 */}
                    <FlexOneContainer>
                        <MyFanPost />
                    </FlexOneContainer>
                    {/* 오른쪽 사이드바 */}
                    <Sidebar setIsModalOpen={setIsModalOpen} />
                </Hstack>
            </Vstack>

            {/* 회원 탈퇴 모달 */}
            <DeleteAccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDeleted={() => {
                    alert("탈퇴 완료! 메인 페이지로 이동합니다.");
                    window.location.href = "/";
                }}
            />
        </Container>
    );
};

export default MyPage;
