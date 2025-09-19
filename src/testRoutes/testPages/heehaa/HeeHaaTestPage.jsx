import { useState } from "react";
import MypageContent from "../../../features/mypage/MypageContent";
import mockData from "../../../shared/store/dummyHeehaa.json";
import mockSubData from "../../../shared/store/dummy2Heehaa.json";

const HeeHaaTestPage = () => {
    const [fanPosting, setFanPosting] = useState(mockData);
    const subscribeArray = mockSubData;

    const [isOpen, setIsOpen] = useState(false);
    const handleCreate = (data) => {
        console.log(data);
    };

    return (
        <>
            <MypageContent
                post={fanPosting}
                subscribeArray={subscribeArray}
                onSubmit={handleCreate}
            />
        </>
    );
};

export default HeeHaaTestPage;
