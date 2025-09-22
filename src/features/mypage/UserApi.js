import useLinkUpStore from "../../shared/store/store.js";

const API_BASE_URL = "http://localhost:5173"; // 추후 환경변수로 이동

export async function deleteAccount(userId) {
  try {
    // store에서 accessToken 가져오기
    const accessToken = useLinkUpStore.getState().accessToken;

    if (!accessToken) throw new Error("로그인 토큰이 없습니다.");

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // JWT 토큰 전달
      },
    });

    if (!response.ok) throw new Error("회원 탈퇴 실패");
    return await response.json();
  } catch (error) {
    console.error("❌ deleteAccount Error:", error);
    throw error;
  }
}