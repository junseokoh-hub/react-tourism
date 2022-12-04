import React, { Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { shallowEqual } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { appAuth } from "./lib/firebaseConfig";
import { onState } from "./store/authSlice";
import { useDispatch, useSelector } from "./store/hooks";
import Loader from "./utils/Loader";
import { HelmetProvider } from "react-helmet-async";
import Route from "./pages/Route";
import Course from "./pages/Course";

const Root = React.lazy(() => import("./Root"));
const Home = React.lazy(() => import("./pages/Home"));
const Accommodation = React.lazy(() => import("./pages/Accommodation"));
const Shopping = React.lazy(() => import("./pages/Shopping"));
const Festival = React.lazy(() => import("./pages/Festival"));
const Detail = React.lazy(() => import("./pages/Detail"));
const LeisureSports = React.lazy(() => import("./pages/LeisureSports"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const Search = React.lazy(() => import("./pages/Search"));
const DomesticSearch = React.lazy(
  () => import("./components/Search/DomesticSearch"),
);
const CampingSearch = React.lazy(
  () => import("./components/Search/CampingSearch"),
);
const DataSearch = React.lazy(() => import("./components/Search/DataSearch"));
const Restaurant = React.lazy(() => import("./pages/Restaurant"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const TravelCourse = React.lazy(() => import("./pages/TravelCourse"));
const TouristDestination = React.lazy(
  () => import("./pages/TouristDestination"),
);
const Camping = React.lazy(() => import("./pages/Camping"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

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
      element: authUser.isAuthReady ? (
        <Suspense fallback={<Loader />}>
          <HelmetProvider>
            <Root />
          </HelmetProvider>
        </Suspense>
      ) : (
        <Loader />
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "search",
          element: <Search />,
          children: [
            { path: "domestic", element: <DomesticSearch /> },
            { path: "camping", element: <CampingSearch /> },
            { path: "data", element: <DataSearch /> },
          ],
        },
        {
          path: "accommodation",
          element: <Accommodation />,
        },
        {
          path: "accommodation/:contentId/:contentTypeId",
          element: <Detail contentType={"accommodation"} />,
        },
        { path: "festival", element: <Festival /> },
        {
          path: "festival/:contentId/:contentTypeId",
          element: <Detail contentType={"festival"} />,
        },
        { path: "restaurant", element: <Restaurant /> },
        {
          path: "restaurant/:contentId/:contentTypeId",
          element: <Detail contentType={"restaurant"} />,
        },
        { path: "shopping", element: <Shopping /> },
        {
          path: "shopping/:contentId/:contentTypeId",
          element: <Detail contentType={"shopping"} />,
        },
        { path: "cultural-facilities", element: <Shopping /> },
        {
          path: "cultural-facilities/:contentId/:contentTypeId",
          element: <Detail contentType={"cultural-facilities"} />,
        },
        { path: "leisure-sports", element: <LeisureSports /> },
        {
          path: "leisure-sports/:contentId/:contentTypeId",
          element: <Detail contentType={"leisure-sports"} />,
        },
        { path: "tourist-destination", element: <TouristDestination /> },
        {
          path: "tourist-destination/:contentId/:contentTypeId",
          element: <Detail contentType={"tourist-destination"} />,
        },
        { path: "travel-course", element: <TravelCourse /> },
        {
          path: "travel-course/:contentId/:contentTypeId",
          element: <Detail contentType={"travel-course"} />,
        },
        { path: "camping", element: <Camping /> },
        { path: "route", element: <Route /> },
        { path: "route/:routeIdx", element: <Course /> },
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
      errorElement: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
