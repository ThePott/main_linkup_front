import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import FrontPage from "./pages/FrontPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import SuperUserPage from "./pages/SuperUserPage.jsx";

const router = createBrowserRouter([
    { path: "/", element: <FrontPage /> },
    { path: "/detail", element: <DetailPage /> },
    { path: "/mypage", element: <MyPage /> },
    { path: "/super-user", element: <SuperUserPage /> },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />,
);
