import { useEffect, useState } from "react";
import CustomButton from "../../../package/customButton/CustomButton.jsx";
import Skeleton from "../../../package/skeleton/Skeleton.jsx";
import { Hstack, Vstack } from "../../../package/layout/";
import Calendar from "../../../package/calendar/Calendar.jsx";
import Modal from "../../../package/modal/Modal.jsx";
import FlexOneContainer from "../../../package/flexOneContainer/FlexOneContainer.jsx";
import GridContainer from "../../../package/gridContainer/GridContainer.jsx";
import CustomImage from "../../../package/customImage/CustomImage.jsx";
import {
    addDays,
    eachDayOfInterval,
    endOfWeek,
    getMonth,
    getYear,
    startOfWeek,
    subDays,
} from "date-fns";
import ArtistCalendar from "../../../shared/ArtistCalendar/ArtistCalendar.jsx";
import axiosInstance, { axiosReturnsData } from "../../../shared/services/axiosInstance.js";
import useLinkUpStore from "../../../shared/store/store.js";

const getFirstDayOfMonth = (date) => {
    return new Date(getYear(date), getMonth(date), 1);
};
const getLastDateOfMonth = (date) => {
    return new Date(getYear(date), getMonth(date) + 1, 0);
};

const getTrailingPrevMonthDateArray = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const startDay = getFirstDayOfMonth(date);
    if (startDay.getDay() === 0) {
        return [];
    }

    const result = eachDayOfInterval({
        start: startOfWeek(getFirstDayOfMonth(date)),
        end: subDays(getFirstDayOfMonth(date), 1),
    });
    return result;
};

const getLeadingNextMonthDateArray = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const lastDay = getLastDateOfMonth(date);
    console.log({ lastDay });

    if (lastDay.getDay() === 6) {
        const result = [];
        return result;
    }
    const result = eachDayOfInterval({
        start: addDays(getLastDateOfMonth(date), 1),
        end: endOfWeek(getLastDateOfMonth(date)),
    });
    return result;
};

const CalendarRowDebugButton = () => {
    const checkAroundEnd = () => {
        const endResult = getLeadingNextMonthDateArray(2025, 2, 2);
        console.log({ endResult });
    };
    const checkAroundStart = () => {
        const startResult = getTrailingPrevMonthDateArray(2025, 2, 2);
        console.log({ startResult });
    };
    return (
        <>
            <CustomButton onClick={checkAroundStart}>check around start of the month</CustomButton>
            <CustomButton onClick={checkAroundEnd}>check around end of the month</CustomButton>
        </>
    );
};

const CircleImage = () => {
    return (
        <CustomImage
            height="MD"
            shape="CIRCLE"
            url="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
    );
};
const SampleImage = () => {
    return (
        <CustomImage
            height="LG"
            shape="ROUNDED_RECTANGLE"
            url="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
    );
};

const getEvents = async () => {
    const data = await axiosReturnsData("GET", "/api/events");
    const eventArray = data.events;
    useLinkUpStore.setState({ eventArray });
};

const ThePottTestPage = () => {
    const [isOn, setIsOn] = useState(false);
    const handleClick = () => {
        setIsOn(!isOn);
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div>
            <CalendarRowDebugButton />
            <Modal isOn={false} onBackgroundClick={handleClick}>
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

            <Hstack>
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
                <CircleImage />
            </Hstack>

            <GridContainer cols="auto" colMinWidth={"md"}>
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
                <FlexOneContainer style={{ backgroundColor: "var(--color-blue)" }} isYScrollable>
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
                <Calendar
                    additionalButtonArray={[
                        <CustomButton>this</CustomButton>,
                        <CustomButton>this</CustomButton>,
                        <CustomButton>this</CustomButton>,
                        <CustomButton>this</CustomButton>,
                        <CustomButton>this</CustomButton>,
                    ]}
                />
                <Vstack items="center" style={{ alignItems: "center" }}>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                    <CustomButton style={{ width: "100px" }}>asdf</CustomButton>
                </Vstack>
                <ArtistCalendar />
            </Vstack>
        </div>
    );
};

export default ThePottTestPage;
