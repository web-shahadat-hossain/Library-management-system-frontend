import App from "@/App";
import CreateBook from "@/pages/createBook";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      {
        path: "create-book",
        Component: CreateBook,
      },
    ],
  },
]);

export default router;
