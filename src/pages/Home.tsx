import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisitorData from "../components/Home/VisitorData";
import SEOMeta from "../SEOMeta";
import KakaoMap from "../utils/KakaoMap";

const FrontBanner = React.lazy(() => import("../components/Home/FrontBanner"));
const HomeSliders = React.lazy(() => import("../components/Home/HomeSliders"));

const Home = () => {
  return (
    <>
      <SEOMeta
        title={"홈"}
        content={"여행을 떠나고 싶을 때 미리 정보를 확인해 계획을 세워보세요!"}
      />
      <section className="space-y-8 divide-y-2">
        <FrontBanner />
        <HomeSliders />
        <Link to="route" className="dark:text-white">
          Route
        </Link>
        <VisitorData />
      </section>
    </>
  );
};

export default Home;
