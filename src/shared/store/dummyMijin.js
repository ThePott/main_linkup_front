import { create } from "zustand";

// Member Class
class Member {
  constructor(
    id,
    name,
    isGroup,
    groupName,
    debutDate,
    birthdate,
    imgFace,
    imgBanner,
    scheduleArray = [],
    postArray = []
  ) {
    this.id = id;
    this.name = name;
    this.isGroup = isGroup;
    this.groupName = groupName;
    this.debutDate = debutDate;
    this.birthdate = birthdate;
    this.imgFace = imgFace;
    this.imgBanner = imgBanner;
    this.scheduleArray = scheduleArray;
    this.postArray = postArray;
  }
}

// Group Class
class Group {
  constructor(
    id,
    name,
    imgFace,
    imgBanner,
    groupScheduleArray = [],
    groupPostArray = [],
    memberArray = []
  ) {
    this.id = id;
    this.name = name;
    this.isGroup = true;
    this.groupName = null;
    this.imgFace = imgFace;
    this.imgBanner = imgBanner;
    this.groupScheduleArray = groupScheduleArray;
    this.groupPostArray = groupPostArray;
    this.memberArray = memberArray;
  }
}

const dummyGroupArray = [
  new Group(
    1,
    "블랙핑크",
    "/images/bp_face.jpg",
    "/images/bp_banner.jpg",
    [
      { id: 101, title: "컴백 무대", sttime: "2025-10-05" },
      { id: 102, title: "팬미팅", sttime: "2025-10-15" },
    ],
    Array.from({ length: 27 }, (_, i) => ({
      postId: i + 1,
      content: `테스트용 더미 포스트 ${i + 1}`,
    })),
    [
      new Member(
        2,
        "제니",
        false,
        "블랙핑크",
        "2016-08-08",
        "1996-01-16",
        "/images/jennie_face.jpg",
        "/images/jennie_banner.jpg",
        [
          { id: 304, title: "솔로 앨범 발매", sttime: "2025-10-20" },
          { id: 305, title: "북미 투어 시작", sttime: "2025-12-03" },
        ],
        []
      ),
      new Member(
        3,
        "지수",
        false,
        "블랙핑크",
        "2016-08-08",
        "1995-01-03",
        "/images/jisoo_face.jpg",
        "/images/jisoo_banner.jpg",
        [
          { id: 301, title: "솔로 앨범 발매", sttime: "2025-11-10" },
          { id: 302, title: "팬미팅 개최", sttime: "2025-11-12" },
          { id: 303, title: "컴백 무대", sttime: "2025-11-11" },
        ],
        []
      ),
    ]
  ),
];

const dummyRecommendedGroupArray = [
  {
    id: 5,
    name: "비슷한 그룹A",
    imgFace: "/images/recommendA.jpg",
  },
  {
    id: 6,
    name: "비슷한 그룹B",
    imgFace: "/images/recommendB.jpg",
  },
];

const useLinkUpStore = create((set) => ({
  groupArray: dummyGroupArray,
  recommendedGroupArray: dummyRecommendedGroupArray,
  searchStatus: "success",
  setSearchStatus: (status) => set({ searchStatus: status }),
}));

export default useLinkUpStore;