import ThePottApiTestPage from "./testPages/thepott/ThePottApiTestPage";
import ThePottTestPage from "./testPages/thepott/ThePottTestPage";

export const ThePottTestRouteArray = [
    { path: "/test/thepott", element: <ThePottTestPage /> },
    { path: "/test/thepott/api", element: <ThePottApiTestPage /> },
];
