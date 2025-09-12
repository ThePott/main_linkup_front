import { useState } from "react";
import CustomButton from "../../../package/customButton/CustomButton.jsx";

const ThePottTestPage = () => {
    const [isOn, setIsOn] = useState(false);
    const handleClick = () => {
        setIsOn(!isOn);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "300px",
            }}
        >
            <CustomButton>shape="RECTANGLE" - 기본값</CustomButton>
            <CustomButton isOn={isOn} shape="PILL" onClick={handleClick}>
                shape="PILL"
            </CustomButton>
            <CustomButton isOn={isOn} color="MONO" onClick={handleClick}>
                color="MONO" - 기본값
            </CustomButton>
            <CustomButton isOn={isOn} color="RED" onClick={handleClick}>
                color="RED"
            </CustomButton>
            <CustomButton isOn={isOn} color="YELLOW" onClick={handleClick}>
                color="YELLOW"
            </CustomButton>
            <CustomButton isOn={isOn} color="BLUE" onClick={handleClick}>
                color="BLUE"
            </CustomButton>
        </div>
    );
};

export default ThePottTestPage;
