import { useEffect, useState } from "react";
import useLinkUpStore from "../shared/store/store";
import { fetchUsers, banUser, unbanUser } from "../features/super-user/SuperuserApi";
import CustomButton from "../package/customButton/CustomButton.jsx"; //커스텀 버튼 컴포넌트
import Modal from "../package/modal/Modal.jsx"; //모달 공통 컴포넌트
import "./SuperUserPage.module.css"; // 스타일 컴포넌트

const SuperUserPage = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");
  const access_token = useLinkUpStore((state) => state.access_token);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (!access_token) throw new Error("토큰이 없습니다.");
        const data = await fetchUsers(access_token);
        const usersArray = Array.isArray(data) ? data : data.users || [];
        setUsers(usersArray);
      } catch (err) {
        console.error(err);
      }
    };

    loadUsers();
  }, [access_token]);

  const openModal = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setActionType("");
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    if (!selectedUser) return;

    try {
      if (actionType === "ban") {
        await banUser(selectedUser.id, access_token);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...u, user_type: "ban" } : u
          )
        );
      } else if (actionType === "unban") {
        await unbanUser(selectedUser.id, access_token);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...u, user_type: "normal" } : u
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      closeModal();
    }
  };

  return (
    <div>
      <h1>관리자 페이지</h1>
      {users.length === 0 ? (
        <p>유저 목록을 불러오지 못했습니다.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>유저 타입</th>
              <th>상태</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.nickname}</td>
                <td>{user.user_type}</td>
                <td>{user.user_type === "ban" ? "차단됨" : "활성"}</td>
                <td>
                  {user.user_type === "ban" ? (
                    <CustomButton
                      shape="RECTANGLE"
                      color="BLUE"
                      isOn
                      onClick={() => openModal(user, "unban")}
                    >
                      차단 해제
                    </CustomButton>
                  ) : (
                    <CustomButton
                      shape="RECTANGLE"
                      isOn
                      onClick={() => openModal(user, "ban")}
                    >
                      차단
                    </CustomButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 모달 */}
      <Modal isOn={modalOpen} onBackgroundClick={closeModal}>
        {selectedUser && (
          <div style={{ textAlign: "center" }}>
            <p>
              정말로 {selectedUser.nickname} 유저를{" "}
              {actionType === "ban" ? "차단" : "차단 해제"}하시겠습니까?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
              <CustomButton
                shape="RECTANGLE"
                color="BLUE"
                isOn
                onClick={handleConfirm}
              >
                확인
              </CustomButton>
              <CustomButton
                shape="RECTANGLE"
                color="MONO"
                isOn
                onClick={closeModal}
              >
                취소
              </CustomButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SuperUserPage;