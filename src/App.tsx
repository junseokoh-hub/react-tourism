import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { appAuth } from "./lib/firebaseConfig";
import About from "./pages/About";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Search from "./pages/Search";
import SignupPage from "./pages/SignupPage";
import Root from "./Root";
import { onState } from "./store/authSlice";
import { useDispatch, useSelector } from "./store/hooks";

const App = () => {
  const authUser = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      console.log(user);
      dispatch(onState(user));
    });
    return unsubscribe;
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser.isAuthReady ? <Root /> : <div>Loading...</div>,
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
