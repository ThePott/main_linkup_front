const API_BASE_URL = "http://3.35.210.2:8000/api/superuser"; // 프록시 사용 x

// 전체 유저 가져오기
export async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}/users`, {
      cache: "no-store", // 매번 새 데이터 요청
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`❌ fetchUsers failed: ${res.status} ${res.statusText}\n${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ fetchUsers Error:", error);
    throw error;
  }
}

// 유저 차단
export async function banUser(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/ban`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`❌ banUser failed: ${res.status} ${res.statusText}\n${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ banUser Error:", error);
    throw error;
  }
}

// 유저 차단 해제
export async function unbanUser(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${id}/unban`, {
      method: "POST",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`❌ unbanUser failed: ${res.status} ${res.statusText}\n${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ unbanUser Error:", error);
    throw error;
  }
}