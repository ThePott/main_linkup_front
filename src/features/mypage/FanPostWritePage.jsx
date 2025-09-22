import React from "react";
import FanPostWriteContent from "./FanPostWriteContent";

const FanPostWritePage = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <h2>팬 포스팅 화면</h2>
            <FanPostWriteContent onSubmit={handleSubmit} />
        </>
    );
};

export default FanPostWritePage;
