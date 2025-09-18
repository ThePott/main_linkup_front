import { Outlet } from "react-router";
import FlexOneContainer from "../package/flexOneContainer/FlexOneContainer";
import { FullScreen } from "../package/layout";
import Navbar from "../features/layout/Navbar";

const Layout = () => {
    return (
        <FullScreen>
            <Navbar />
            <FlexOneContainer isYScrollable>
                <Outlet />
            </FlexOneContainer>
        </FullScreen>
    );
};

export default Layout;
