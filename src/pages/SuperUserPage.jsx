import React, { useState, useEffect } from "react";
import "./SuperUserPage.css";
import CustomButton from "../package/customButton/CustomButton.jsx";
import { fetchUsers, banUser, unbanUser } from "../features/super-user/SuperuserApi";

const SuperUserPage = () => {
  const [emailSearch, setEmailSearch] = useState("");
  const [nicknameSearch, setNicknameSearch] = useState("");
  const [users, setUsers] = useState([]);

  // 유저 목록 불러오기
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        alert("유저 목록을 불러오지 못했습니다.");
      }
    };
    loadUsers();
  }, []);

  // 차단 / 차단 해제
  const handleToggleBan = async (id, banned) => {
    try {
      if (banned) {
        await unbanUser(id);
        alert(`유저 ${id} 차단을 해제했습니다.`);
      } else {
        await banUser(id);
        alert(`유저 ${id}을(를) 차단했습니다.`);
      }

      // 상태 업데이트
      setUsers(users.map((u) => (u.id === id ? { ...u, banned: !banned } : u)));
    } catch (error) {
      console.error(error);
      alert("처리 실패");
    }
  };

  // 검색 필터링
  const filteredUsers = users.filter(
    (user) =>
      user.email.includes(emailSearch) && user.nickname.includes(nicknameSearch)
  );

  return (
    <div className="superuser-container">
      <h1 className="title">유저 관리</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="이메일 검색"
          value={emailSearch}
          onChange={(e) => setEmailSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="닉네임 검색"
          value={nicknameSearch}
          onChange={(e) => setNicknameSearch(e.target.value)}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>닉네임</th>
            <th>이메일 or 아이디</th>
            <th>권한</th>
            <th>상태</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.nickname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.banned ? "차단됨" : "정상"}</td>
              <td style={{ display: "flex", gap: "8px" }}>
                <CustomButton
                  color={user.banned ? "BLUE" : "RED"}
                  shape="RECTANGLE"
                  onClick={() => handleToggleBan(user.id, user.banned)}
                >
                  {user.banned ? "Unban" : "Ban"}
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperUserPage;