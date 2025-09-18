import { Outlet } from "react-router";
import FlexOneContainer from "../package/flexOneContainer/FlexOneContainer";
import Navbar from "../features/layout/Navbar";
import { FullScreen } from "../package/layout";

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
