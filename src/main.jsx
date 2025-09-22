import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import FrontPage from "./pages/FrontPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import SuperUserPage from "./pages/SuperUserPage.jsx";
import TestRouteArray from "./testRoutes/";
import AgencyPage from "./pages/AgencyPage";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage";
import queryClient from "./shared/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout";
import FanPostWritePage from "./features/mypage/FanPostWritePage";

const ProductRouteArray = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <FrontPage /> },
            { path: "/detail/:type/:id", element: <DetailPage /> },
            { path: "/mypage", element: <MyPage /> },
            { path: "/mypage/write", element: <FanPostWritePage /> },
            { path: "/agency", element: <AgencyPage /> },
            { path: "/signup", element: <SignupPage /> },
            { path: "/login", element: <LoginPage /> },
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
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);
