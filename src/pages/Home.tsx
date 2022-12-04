import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import VisitorData from "../components/Home/VisitorData";

const FrontBanner = React.lazy(() => import("../components/Home/FrontBanner"));
const HomeSliders = React.lazy(() => import("../components/Home/HomeSliders"));

const Home = () => {
  return (
    <>
      <Helmet>
        <title>홈</title>
      </Helmet>
      <section className="space-y-8 divide-y-2">
        <FrontBanner />
        <HomeSliders />
        <Link to="route">Route</Link>
        <VisitorData />
      </section>
    </>
  );
};

export default Home;
