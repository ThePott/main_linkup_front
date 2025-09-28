import ThePottApiTestPage from "./testPages/thepott/ThePottApiTestPage";
import ThePottFormTestPage from "./testPages/thepott/ThePottFormTestPage";
import ThePottTestPage from "./testPages/thepott/ThePottTestPage";

export const ThePottTestRouteArray = [
    { path: "/test/thepott", element: <ThePottTestPage /> },
    { path: "/test/thepott/api", element: <ThePottApiTestPage /> },
    { path: "/test/thepott/form", element: <ThePottFormTestPage /> },
];
