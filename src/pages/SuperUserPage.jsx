import { useState } from "react";
import Modal from "../package/Modal";
import CustomButton from "../package/CustomButton";

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
            <CustomButton shape="PILL">내용물</CustomButton>
            <CustomButton shape="RECTANGLE">내용물</CustomButton>
            <CustomButton isOn={true}>내용물</CustomButton>
            <CustomButton isOn={true} color="RED">
                내용물
            </CustomButton>
            <CustomButton>내용물</CustomButton>
        </div>
    );
};

export default SuperUserPage;
