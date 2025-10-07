import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import testRouteArray from "./testRoutes/";
import queryClient from "./shared/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout";
import FanPostWritePage from "./features/mypage/FanPostWritePage";
import { lazy, Suspense } from "react";
const FrontPage = lazy(() => import("./pages/FrontPage.jsx"));
const DetailPage = lazy(() => import("./pages/DetailPage.jsx"));
const MyPage = lazy(() => import("./pages/MyPage.jsx"));
const SuperUserPage = lazy(() => import("./pages/SuperUserPage.jsx"));
const AgencyPage = lazy(() => import("./pages/AgencyPage"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const productRouteArray = [
    { path: "/", element: <FrontPage /> },
    { path: "/detail/:type/:id", element: <DetailPage /> },
    { path: "/mypage", element: <MyPage /> },
    { path: "/mypage/write", element: <FanPostWritePage /> },
    { path: "/agency", element: <AgencyPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/super-user", element: <SuperUserPage /> },
];

const suspenedRouteArray = productRouteArray.map((route) => ({
    path: route.path,
    element: <Suspense>{route.element}</Suspense>,
}));

const routeArray = [
    ...testRouteArray,
    {
        path: "/",
        element: <Layout />,
        children: [...productRouteArray, ...suspenedRouteArray],
    },
];

const router = createBrowserRouter(routeArray);

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>,
);
