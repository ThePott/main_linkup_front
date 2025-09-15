import { create } from "zustand";

const dummyArtists = [
  {
    artist_id: 1,
    group_name: "블랙핑크", 
    artist_is_group: true, 
    img_face: "/images/bp_face.jpg",
    img_banner: "/images/bp_banner.jpg",
    schedules: [
      { title: "해외투어 일정", sttime: "2025-09-30" },
      { title: "팬미팅", sttime: "2025-10-05" },
      { title: "팬 사인회", sttime: "2025-10-15" }
    ],
    posts: Array.from({ length: 27 }, (_, i) => ({
      post_id: i + 1,
      content: `테스트용 더미 포스트 ${i + 1}`
    }))
  },
  // 멤버들
  {
    artist_id: 2,
    group_member_name: "제니",
    group_name: "블랙핑크",
    artist_is_group: false,
    img_face: "/images/jennie_face.jpg",
    img_banner: "/images/jennie_banner.jpg",
    schedules: [],
    posts: []
  },
  {
    artist_id: 3,
    group_member_name: "지수",
    group_name: "블랙핑크",
    artist_is_group: false,
    img_face: "/images/jisoo_face.jpg",
    img_banner: "/images/jisoo_banner.jpg",
    schedules: [],
    posts: []
  }
];

const dummyRecommendedGroups = [
  {
    artist_id: 5,
    artist_name: "비슷한 그룹A",
    img_face: "/images/recommendA.jpg"
  },
  {
    artist_id: 6,
    artist_name: "비슷한 그룹B",
    img_face: "/images/recommendB.jpg"
  }
];

const useLinkUpStore = create((set) => ({
  artists: dummyArtists,
  recommendedGroups: dummyRecommendedGroups,
  searchStatus: "success",
  setSearchStatus: (status) => set({ searchStatus: status })
}));

export default useLinkUpStore;
