import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import FrontPage from "./pages/FrontPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import SuperUserPage from "./pages/SuperUserPage.jsx";
import TestRouteArray from "./testRoutes/";
import Layout from "./package/layout/Layout.jsx";
import AgencyPage from "./pages/AgencyPage";

const ProductRouteArray = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <FrontPage /> },
            { path: "/detail", element: <DetailPage /> },
            { path: "/mypage", element: <MyPage /> },
            { path: "/agency", element: <AgencyPage /> },
        ],
    },

    {
        path: "/super-user",
        element: <SuperUserPage />, // Navbar superuserpage에서 분리
    },
];
const routeArray = [...ProductRouteArray, ...TestRouteArray];

const router = createBrowserRouter(routeArray);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />,
);
