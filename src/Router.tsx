import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      { path: "search", element: <Search /> },
    ],
  },
]);

export default router;
