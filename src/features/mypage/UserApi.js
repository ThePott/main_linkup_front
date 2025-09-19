const API_BASE_URL = "http://localhost:5173"; // 서버 주소 맞게 수정, 후에 환경변수로 수정

export async function deleteAccount(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("회원 탈퇴 실패");
    return await response.json();
  } catch (error) {
    console.error("❌ deleteAccount Error:", error);
    throw error;
  }
}