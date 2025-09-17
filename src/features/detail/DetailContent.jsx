import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import useLinkUpStore from "../../shared/store/dummyMijin.js";
import RoundBox from "../../package/RoundBox.jsx";
import Calendar from "../../package/calendar/Calendar.jsx";
import CustomButton from "../../package/customButton/CustomButton.jsx";
import Modal from "../../package/modal/Modal.jsx"; 

const DetailContent = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();

  const groupArray = useLinkUpStore((state) => state.groupArray);
  const subscribedArtistIdArray = useLinkUpStore(
    (state) => state.subscribedArtistIdArray || []
  );
  const toggleSubscribe = useLinkUpStore((state) => state.toggleSubscribe);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentGroup = groupArray.find((g) => g.id === Number(artistId));
  const currentMember = groupArray
    .flatMap((g) => g.memberArray)
    .find((m) => m.id === Number(artistId));

  if (!currentGroup && !currentMember) {
    return <div>해당 아티스트를 찾을 수 없습니다.</div>;
  }

  const artist = currentGroup || currentMember;
  const schedules = currentGroup
    ? [
        ...currentGroup.groupScheduleArray.map((s) => ({
          ...s,
          owner: currentGroup.name,
        })),
        ...currentGroup.memberArray.flatMap((m) =>
          m.scheduleArray.map((s) => ({
            ...s,
            owner: m.name,
          }))
        ),
      ].sort((a, b) => new Date(a.sttime) - new Date(b.sttime))
    : artist.scheduleArray.map((s) => ({
        ...s,
        owner: artist.name,
      }));

  const posts = artist.groupPostArray || artist.postArray || [];


  const subscribedArtists = [
    ...groupArray,
    ...groupArray.flatMap((g) => g.memberArray),
  ].filter((a) => subscribedArtistIdArray.includes(a.id));

  const handleConfirmUnsubscribe = () => {
    toggleSubscribe(Number(artistId));
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        marginTop: "150px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >



      {/* 1. 상단 */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {subscribedArtists.map((artistItem) => (
          <RoundBox
            key={artistItem.id}
            onClick={() => navigate(`/detail/${artistItem.id}`)}
            style={{
              width: "70px",
              height: "80px",
              borderRadius: "50%",
              padding: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={artistItem.imgFace}
              alt={artistItem.name}
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <div style={{ fontSize: "0.7rem" }}></div>
          </RoundBox>
        ))}

        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          <CustomButton shape="RECTANGLE" color="MONO" isOn>
            구독중
          </CustomButton>
          <CustomButton
            shape="RECTANGLE"
            color="gray" 
            isOn
            onClick={() => setIsModalOpen(true)}
          >
            구독 취소하기
          </CustomButton>
        </div>
      </div>




      {/* 2. 달력 */}
      <Calendar schedules={schedules} />




      {/* 3. 최신 일정 */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>일정</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {schedules.slice(0, 3).map((s, i) => (
            <RoundBox key={i}>
              {s.owner} {s.title} - {s.sttime}
            </RoundBox>
          ))}
        </div>
      </div>




      {/* 4. 팬포스트 */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>팬 포스트</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {posts.slice(0, 24).map((post) => (
            <RoundBox
              key={post.postId}
              style={{ textAlign: "left", cursor: "pointer" }}
              onClick={() => navigate(`/post/${post.postId}`)}
            >
              {post.content}
            </RoundBox>
          ))}
        </div>
      </div>




      {/* 모달 */}
      <Modal isOn={isModalOpen} onBackgroundClick={() => setIsModalOpen(false)}>
        <h3>구독을 취소하시겠습니까?</h3>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <CustomButton shape="RECTANGLE" color="RED" isOn onClick={handleConfirmUnsubscribe}>
            예
          </CustomButton>
          <CustomButton shape="RECTANGLE" color="MONO" isOn onClick={() => setIsModalOpen(false)}>
            아니요
          </CustomButton>
        </div>
      </Modal>
    </div>
  );
};

export default DetailContent;
