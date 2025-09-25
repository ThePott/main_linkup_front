import React, { useEffect, useState } from "react";
import Sidebar from "../features/mypage/Sidebar.jsx";
import RoundBox from "../package/RoundBox.jsx";
import DeleteAccountModal from "../features/mypage/DeleteAccountModal.jsx";
import useLinkUpStore from "../shared/store/store";
import { apiAuthMe } from "../shared/services/linkupApi.js";
import "./MyPage.css";
import MyFanPost from "../features/mypage/MyFanPost.jsx";

const MyPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [postsCount, setPostsCount] = useState(0);
    const [likesCount, setLikesCount] = useState(0);

    const accessToken = useLinkUpStore((state) => state.access_token);

    // 내 프로필 불러오기
    useEffect(() => {
        if (!accessToken) return;

        const fetchUserInfo = async () => {
            try {
                const data = await apiAuthMe("GET");
                setUserInfo(data);
            } catch (err) {
                console.error("회원 정보 가져오기 실패:", err);
            }
        };

        fetchUserInfo();
    }, [accessToken]);

    // 내 포스트 + 좋아요 개수 불러오기
    useEffect(() => {
        if (!accessToken || !userInfo) return;

        const fetchMyPosts = async () => {
            try {
                const res = await fetch(`/api/posts?limit=100&offset=0`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`포스트 불러오기 실패: ${res.status}`);
                }

                const posts = await res.json();

                // 내가 작성한 포스트만 필터링
                const myPosts = posts.filter((post) => post.user.id === userInfo.id);

                setPostsCount(myPosts.length);

                // 좋아요 수 합산
                const totalLikes = myPosts.reduce(
                    (sum, post) => sum + (post.likes_count ?? 0),
                    0
                );
                setLikesCount(totalLikes);
            } catch (err) {
                console.error("내 포스트 불러오기 실패:", err);
            }
        };

        fetchMyPosts();
    }, [accessToken, userInfo]);

    if (!accessToken) return <div>로그인이 필요합니다.</div>;
    if (!userInfo) return <div>로딩 중...</div>;

    const userStats = {
        following: 0, // 아직 API 없음 → 임시 0
        likes: likesCount,
        posts: postsCount,
    };

    return (
        <div className="mypage-wrapper">
            {/* 사용자 프로필 */}
            <div className="profile-feed">
                <div className="profile-box">
                    <img
                        src={userInfo.profile || "default-profile.png"}
                        alt={userInfo.nickname}
                        className="user-profile"
                    />
                    <div className="user-info">
                        <span className="user-name">{userInfo.nickname}</span>
                        <div className="user-stats">
                            <span>팔로잉: {userStats.following}</span>
                            <span>포스트: {userStats.posts}</span>
                            <span>좋아요: {userStats.likes}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 본문 영역 */}
            <div className="mypage-container">
                <div className="mypage-content">
                    <div className="card-grid">
                        <MyFanPost />
                    </div>
                </div>

                {/* 오른쪽 사이드바 */}
                <Sidebar setIsModalOpen={setIsModalOpen} />
            </div>

            {/* 회원 탈퇴 모달 */}
            <DeleteAccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDeleted={() => {
                    alert("탈퇴 완료! 메인 페이지로 이동합니다.");
                    window.location.href = "/";
                }}
            />
        </div>
    );
};

export default MyPage;
