import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { shallowEqual } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { appAuth } from "./lib/firebaseConfig";
import { onState } from "./store/slices/authSlice";
import { useDispatch, useSelector } from "./store/hooks";
import Loader from "./utils/Loader.js";
import { HelmetProvider } from "react-helmet-async";
import Root from "./Root.js";

const Home = React.lazy(() => import("./pages/Home.js"));
const Detail = React.lazy(() => import("./pages/tourismPages/Detail.js"));
const DetailInfo = React.lazy(
  () => import("./components/Detail/DetailInfo.js"),
);
const DetailMap = React.lazy(() => import("./components/Detail/DetailMap.js"));
const DetailReview = React.lazy(
  () => import("./components/Detail/DetailReview.js"),
);
const Accommodation = React.lazy(
  () => import("./pages/tourismPages/Accommodation.js"),
);
const Shopping = React.lazy(() => import("./pages/tourismPages/Shopping.js"));
const Festival = React.lazy(() => import("./pages/tourismPages/Festival.js"));

const LeisureSports = React.lazy(
  () => import("./pages/tourismPages/LeisureSports.js"),
);
const SignupPage = React.lazy(() => import("./pages/authPages/SignupPage.js"));
const Search = React.lazy(() => import("./pages/Search.js"));
const DomesticSearch = React.lazy(
  () => import("./components/Search/DomesticSearch.js"),
);
const RouteSearch = React.lazy(
  () => import("./components/Search/RouteSearch.js"),
);

const Restaurant = React.lazy(
  () => import("./pages/tourismPages/Restaurant.js"),
);
const LoginPage = React.lazy(() => import("./pages/authPages/LoginPage.js"));
const TravelCourse = React.lazy(
  () => import("./pages/tourismPages/TravelCourse.js"),
);
const TouristDestination = React.lazy(
  () => import("./pages/tourismPages/TouristDestination.js"),
);
const Camping = React.lazy(() => import("./pages/campingPages/Camping.js"));
const CampingDetail = React.lazy(
  () => import("./pages/campingPages/CampingDetail.js"),
);
const CampingMapSearch = React.lazy(
  () => import("./pages/campingPages/CampingMapSearch.js"),
);
const CampingInputSearch = React.lazy(
  () => import("./pages/campingPages/CampingInputSearch.js"),
);
const Course = React.lazy(() => import("./pages/Course.js"));
const MyPage = React.lazy(() => import("./pages/UserPages/MyPage.js"));
const MyReviews = React.lazy(() => import("./pages/UserPages/MyReviews.js"));
const MyPreference = React.lazy(
  () => import("./pages/UserPages/MyPreference.js"),
);
const MyPreferenceLists = React.lazy(
  () => import("./pages/UserPages/MyPreferenceLists.js"),
);

const NotFound = React.lazy(() => import("./pages/NotFound.js"));

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
        <HelmetProvider>
          <Root />
        </HelmetProvider>
      ) : (
        <Loader position={"top-[100px]"} />
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
            { path: "route", element: <RouteSearch /> },
          ],
        },
        {
          path: "accommodation",
          element: <Accommodation />,
        },
        {
          path: "accommodation/:contentId/:contentTypeId",
          element: <Detail contentType={"accommodation"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        { path: "festival", element: <Festival /> },
        {
          path: "festival/:contentId/:contentTypeId",
          element: <Detail contentType={"festival"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        { path: "restaurant", element: <Restaurant /> },
        {
          path: "restaurant/:contentId/:contentTypeId",
          element: <Detail contentType={"restaurant"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        { path: "shopping", element: <Shopping /> },
        {
          path: "shopping/:contentId/:contentTypeId",
          element: <Detail contentType={"shopping"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        { path: "cultural-facilities", element: <Shopping /> },
        {
          path: "cultural-facilities/:contentId/:contentTypeId",
          element: <Detail contentType={"cultural-facilities"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        { path: "leisure-sports", element: <LeisureSports /> },
        {
          path: "leisure-sports/:contentId/:contentTypeId",
          element: <Detail contentType={"leisure-sports"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        { path: "tourist-destination", element: <TouristDestination /> },
        {
          path: "tourist-destination/:contentId/:contentTypeId",
          element: <Detail contentType={"tourist-destination"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        { path: "travel-course", element: <TravelCourse /> },
        {
          path: "travel-course/:contentId/:contentTypeId",
          element: <Detail contentType={"travel-course"} />,
          children: [
            { path: "detail", element: <DetailInfo /> },
            { path: "map", element: <DetailMap /> },
            { path: "review", element: <DetailReview /> },
          ],
        },
        {
          path: "camping",
          element: <Camping />,
          children: [
            {
              path: "map-search",
              element: <CampingMapSearch />,
            },
            { path: "input-search", element: <CampingInputSearch /> },
          ],
        },
        { path: "camping/detail/:mapX/:mapY", element: <CampingDetail /> },
        { path: "route/:routeIdx", element: <Course /> },
        {
          path: "myPreference",
          element: authUser.user ? <MyPreference /> : <Navigate to="/login" />,
          children: [
            {
              path: "tourism",
              element: authUser.user ? (
                <MyPreferenceLists />
              ) : (
                <Navigate to="/login" />
              ),
            },
            {
              path: "camping",
              element: authUser.user ? (
                <MyPreferenceLists />
              ) : (
                <Navigate to="/login" />
              ),
            },
          ],
        },
        {
          path: "myReviews",
          element: authUser.user ? <MyReviews /> : <Navigate to="/login" />,
        },
        {
          path: "myPage",
          element: authUser.user ? <MyPage /> : <Navigate to="/login" />,
        },
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
