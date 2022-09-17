import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ArticlesPage } from "../../../pages/articles/articlesPage";

/**
 * Router is not explicitly needed for this assignment, but if we were to expand on this, it's nice to have it available.
 */
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <ArticlesPage />,
  },
]);
