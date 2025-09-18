import React, { useState } from "react";
import "./SuperUserPage.css";
import CustomButton from "../package/customButton/CustomButton.jsx";

const SuperUserPage = () => {
  const [emailSearch, setEmailSearch] = useState("");
  const [nicknameSearch, setNicknameSearch] = useState("");

  // 임시 유저 데이터 (나중에 API 연동 가능)
  const [users, setUsers] = useState([
    { id: 1, nickname: "OOO", email: "OOO123@naver.com", role: "유저" },
    { id: 2, nickname: "OOO", email: "OOO123@gmail.com", role: "유저" },
    { id: 3, nickname: "xxx", email: "OOO123@naver.com", role: "유저" },
    { id: 4, nickname: "OOO", email: "OOO456@gmail.com", role: "소속사" },
    { id: 5, nickname: "OOO", email: "OOO789@gmail.com", role: "소속사" },
  ]);

  const handleBan = (id) => {
    alert(`유저 ${id}을(를) 차단합니다.`);
  };

  const handleEdit = (id) => {
    alert(`유저 ${id} 정보 수정`);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

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
                  edit
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