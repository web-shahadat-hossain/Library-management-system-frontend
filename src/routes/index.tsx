import App from "@/App";
import BorrowSummaryPage from "@/pages/borrowSummary";
import CreateBook from "@/pages/createBook";
import EditBookPage from "@/pages/editBook";
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
      {
        path: "edit-book/:id",
        Component: EditBookPage,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummaryPage,
      },
    ],
  },
]);

export default router;
