import { createBrowserRouter } from "react-router-dom";
import { BundlePage } from "../../../pages/bundle/bundlePage";

/**
 * Router is not explicitly needed for this assignment, but if we were to expand on this, it's nice to have it available.
 */
export const Router = createBrowserRouter([
    {
        path: "/",
        element: <BundlePage />,
    },
]);
