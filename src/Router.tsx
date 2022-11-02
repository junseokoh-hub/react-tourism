import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Search from "./pages/Search";
import SignupPage from "./pages/SignupPage";
import Root from "./Root";
import { useSelector } from "./store/hooks";

const Router = () => {
  const isAuth = useSelector((state) => state.auth.user);
  return (
    <RouterProvider
      router={createBrowserRouter([
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
            { path: "login", element: isAuth && <LoginPage /> },
            { path: "signup", element: isAuth && <SignupPage /> },
          ],
          errorElement: <div>Not Found</div>,
        },
      ])}
    />
  );
};

export default Router;
