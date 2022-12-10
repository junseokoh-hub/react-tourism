import React from "react";
import { Link } from "react-router-dom";
import VisitorData from "../components/Home/VisitorData";
import SEOMeta from "../SEOMeta";

const FrontBanner = React.lazy(() => import("../components/Home/FrontBanner"));
const CampingIndicator = React.lazy(
  () => import("../components/Home/CampingIndicator"),
);

const Home = () => {
  console.log("rendering");

  return (
    <>
      <SEOMeta
        title={"홈"}
        content={"여행을 떠나고 싶을 때 미리 정보를 확인해 계획을 세워보세요!"}
      />
      <section className="space-y-8 divide-y-2">
        <FrontBanner />
        <CampingIndicator sliderId="slider" />
        <Link to="route" className="dark:text-white">
          Route
        </Link>
        <VisitorData />
      </section>
    </>
  );
};

export default Home;
