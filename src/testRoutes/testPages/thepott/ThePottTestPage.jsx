import { useState } from "react";
import CustomButton from "../../../package/customButton/CustomButton.jsx";
import Skeleton from "../../../package/skeleton/Skeleton.jsx";
import { Hstack, Vstack } from "../../../package/layout/";
import Calendar from "../../../package/calendar/Calendar.jsx";
import Modal from "../../../package/modal/Modal.jsx";
import FlexOneContainer from "../../../package/flexOneContainer/FlexOneContainer.jsx";
import GridContainer from "../../../package/gridContainer/GridContainer.jsx";
import CustomImage from "../../../package/customImage/CustomImage.jsx";

const SampleImage = () => {
    return (
        <CustomImage
            height="MD"
            shape="ROUNDED_RECTANGLE"
            url="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
    );
};

const ThePottTestPage = () => {
    const [isOn, setIsOn] = useState(false);
    const handleClick = () => {
        setIsOn(!isOn);
    };

    return (
        <div>
            <Modal isOn={isOn} onBackgroundClick={handleClick}>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <p>anything here yayayay</p>
                <CustomButton onClick={handleClick}>close</CustomButton>
            </Modal>
            <Vstack items="center">
                <span>something</span>
                <span>something</span>
                <span>something</span>
                <span>something</span>
                <span>something</span>
            </Vstack>

            <GridContainer cols="auto" colMinWidth={"var(--sizing-md)"}>
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
                <SampleImage />
            </GridContainer>

            <Hstack style={{ height: "200px" }}>
                <div
                    style={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: "var(--color-red)",
                    }}
                >
                    sidebar
                </div>
                <FlexOneContainer
                    style={{ backgroundColor: "var(--color-blue)" }}
                    isYScrollable
                >
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                    <p>여기에 아무거나 있다고 치고</p>
                </FlexOneContainer>
            </Hstack>
            <Vstack center>
                <Skeleton widthInPixel={600} heightInPixel={100} />
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
                <Calendar />
                <Vstack items="center" style={{ alignItems: "center" }}>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                </Vstack>
            </Vstack>
        </div>
    );
};

export default ThePottTestPage;
