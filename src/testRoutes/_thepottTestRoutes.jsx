import ThePottApiTestPage from "./testPages/thepott/apiTest/ThePottApiTestPage";
import ThePottFormTestPage from "./testPages/thepott/ThePottFormTestPage";
import ThePottTanstackTestPage from "./testPages/thepott/ThePottTanstackTestPage";
import ThePottTestPage from "./testPages/thepott/ThePottTestPage";

export const ThePottTestRouteArray = [
    { path: "/test/thepott", element: <ThePottTestPage /> },
    { path: "/test/thepott/api", element: <ThePottApiTestPage /> },
    { path: "/test/thepott/form", element: <ThePottFormTestPage /> },
    { path: "/test/thepott/tanstack", element: <ThePottTanstackTestPage /> },
];
