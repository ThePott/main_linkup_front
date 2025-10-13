const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/superuser`;

// 전체 유저 가져오기
export async function fetchUsers(access_token) {
    try {
        const res = await fetch(`${API_BASE_URL}/users`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`, // 토큰 추가
            },
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
export async function banUser(id, access_token) {
    try {
        const res = await fetch(`${API_BASE_URL}/users/ban`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
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
export async function unbanUser(id, access_token) {
    try {
        const res = await fetch(`${API_BASE_URL}/users/${id}/unban`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
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

