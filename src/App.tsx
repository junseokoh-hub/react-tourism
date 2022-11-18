import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { appAuth } from "./lib/firebaseConfig";
import Accommodation from "./pages/Accommodation";
import Detail from "./pages/Detail";
import Festival from "./pages/Festival";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Restaurant from "./pages/Restaurant";
import Search from "./pages/Search";
import SignupPage from "./pages/SignupPage";
import Root from "./Root";
import { onState } from "./store/authSlice";
import { useDispatch, useSelector } from "./store/hooks";
import Loader from "./utils/Loader";

const App = () => {
  const authUser = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      dispatch(onState(user));
    });
    return unsubscribe;
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser.isAuthReady ? <Root /> : <Loader />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "accommodation",
          element: <Accommodation />,
        },
        {
          path: "accommodation/:contentId/:contentTypeId",
          element: <Detail />,
        },
        { path: "festival", element: <Festival /> },
        { path: "festival/:contentId/:contentTypeId", element: <Detail /> },
        { path: "restaurant", element: <Restaurant /> },
        { path: "restaurant/:contentId/:contentTypeId", element: <Detail /> },
        {
          path: "login",
          element: !authUser.user ? (
            <LoginPage />
          ) : (
            <Navigate to="/" replace={true} />
          ),
        },
        {
          path: "signup",
          element: !authUser.user ? (
            <SignupPage />
          ) : (
            <Navigate to="/" replace={true} />
          ),
        },
      ],
      errorElement: <div>Not Found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
