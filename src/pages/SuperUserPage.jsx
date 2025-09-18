import React, { useState, useEffect } from "react";
import "./SuperUserPage.css";
import CustomButton from "../package/customButton/CustomButton.jsx";
import { fetchUsers, banUser, unbanUser, deleteUser, } from "../features/super-user/SuperuserApi"

const SuperUserPage = () => {
  const [emailSearch, setEmailSearch] = useState("");
  const [nicknameSearch, setNicknameSearch] = useState("");
  const [users, setUsers] = useState([]);

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

  // 차단
  const handleBan = async (id) => {
    try {
      await banUser(id);
      alert(`유저 ${id}을(를) 차단했습니다.`);
      setUsers(users.map((u) => (u.id === id ? { ...u, banned: true } : u)));
    } catch (error) {
      alert("차단 실패");
    }
  };

  // 차단 해제
  const handleUnban = async (id) => {
    try {
      await unbanUser(id);
      alert(`유저 ${id} 차단을 해제했습니다.`);
      setUsers(users.map((u) => (u.id === id ? { ...u, banned: false } : u)));
    } catch (error) {
      alert("차단 해제 실패");
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      alert(`유저 ${id}을(를) 삭제했습니다.`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("삭제 실패");
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
                  color="RED"
                  shape="RECTANGLE"
                  onClick={() => handleBan(user.id)}
                >
                  ban
                </CustomButton>
                <CustomButton
                  color="BLUE"
                  shape="RECTANGLE"
                  onClick={() => handleEdit(user.id)}
                >
                  Unban
                </CustomButton>
                <CustomButton
                  color="MONO"
                  shape="RECTANGLE"
                  onClick={() => handleDelete(user.id)}
                >
                  delete
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