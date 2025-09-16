import Sidebar from "../features/mypage/Sidebar.jsx";
import CustomInput from "../package/CustomInput.jsx";
import RoundBox from "../package/RoundBox.jsx";
import "./MyPage.css";

const cardData = [
  { id: 1, title: "카드 1", image: "x", description: "설명 1" },
  { id: 2, title: "카드 2", image: "x", description: "설명 2" },
  { id: 3, title: "카드 3", image: "x", description: "설명 3" },
  { id: 4, title: "카드 4", image: "x", description: "설명 4" },
  { id: 5, title: "카드 5", image: "x", description: "설명 5" },
  { id: 6, title: "카드 6", image: "x", description: "설명 6" },
  { id: 7, title: "카드 7", image: "x", description: "설명 7" },
  { id: 8, title: "카드 8", image: "x", description: "설명 8" },
];

// 현재 로그인한 사용자 정보
const currentUser = {
  name: "홍길동",
  profile: "x",
  following: 120, //예시 로그인 시 api로 be에서 호출 받을 예정
  likes: 340, 
  posts: 15 
};

const MyPage = () => {
  const handleSearch = (value) => {
    console.log("검색어:", value); // 카드 필터링이나 API 호출 가능
  };

  return (
    <div className="mypage-wrapper">
        <div className="search-box search-top">
          <CustomInput placeholder="키워드 검색" onChange={(e) => handleSearch(e.target.value)} />
        </div>

      {/* 사용자 프로필 */}
      <div className="profile-feed">
        <div className="profile-box">
          <img src={currentUser.profile} alt={currentUser.name} className="user-profile" />
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <div className="user-stats">
              <span>팔로잉: {currentUser.following}</span>
              <span>좋아요: {currentUser.likes}</span>
              <span>포스트: {currentUser.posts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역(크게 필요 없음) */}
      <div className="mypage-container">
        <div className="mypage-content">

          {/* 카드 피드 */}
          <div className="card-grid">
            {cardData.map((card) => (
              <RoundBox key={card.id}>
                {card.title}
              </RoundBox>
            ))}
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <Sidebar />
      </div>
    </div>
  );
};

export default MyPage;