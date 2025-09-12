import { useState } from "react";
import Modal from "../package/Modal";

const SuperUserPage = () => {
    const [isOpened, setIsOpened] = useState(true);
    return (
        <div style={{ position: "relative" }}>
            <Modal isOn={isOpened} onBackgroundClick={() => setIsOpened(false)}>
                삭제를 하면 돌이킬 수 없습니다
            </Modal>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
            <div>빈 칸 채우는 용의 아무 텍스트</div>
        </div>
    );
};

export default SuperUserPage;
