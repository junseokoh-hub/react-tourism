import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Search from "./pages/Search";
import SignupPage from "./pages/SignupPage";
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
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
    errorElement: <div>Not Found</div>,
  },
]);

export default router;
