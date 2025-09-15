import Sidebar from "../package/Sidebar.jsx";
import CustomInput from "../package/CustomInput.jsx"; // 커스텀 인풋 사용
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

const MyPage = () => {
  const handleSearch = (value) => {
    console.log("검색어:", value); // 여기서 카드 필터링이나 API 호출 가능
  };

  return (
    <div className="mypage-wrapper">

      <nav className="navbar">
        <div className="logo">로고</div>
        <div className="search-box">
          <CustomInput
            placeholder="키워드 검색"
          />
        </div>
      </nav>

      {/* 본문 영역 */}
      <div className="mypage-container">
        <div className="mypage-content">
          <h1>마이페이지</h1>
          <p>여기서 마이페이지 내용을 확인</p>
          
          {/* 카드 그리드 영역 */}
          <div className="card-grid">
            {cardData.map((card) => (
              <div key={card.id} className="card">
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
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