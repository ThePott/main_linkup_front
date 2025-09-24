const API_BASE_URL = "http://localhost:5173"; // 서버 주소에 맞게 수정

// 전체 유저 가져오기
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/superuser/users`);
    if (!response.ok) throw new Error("유저 데이터를 불러오지 못했습니다.");
    return await response.json();
  } catch (error) {
    console.error("❌ fetchUsers Error:", error);
    throw error;
  }
}

// 유저 차단 (POST /api/superuser/users/ban)
export async function banUser(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/superuser/users/ban`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id }), // user_id 전달
    });
    if (!response.ok) throw new Error("유저 차단 실패");
    return await response.json();
  } catch (error) {
    console.error("❌ banUser Error:", error);
    throw error;
  }
}

// 유저 차단 해제 (POST /api/superuser/users/{user_id}/unban)
export async function unbanUser(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/superuser/users/${id}/unban`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("유저 차단 해제 실패");
    return await response.json();
  } catch (error) {
    console.error("❌ unbanUser Error:", error);
    throw error;
  }
}