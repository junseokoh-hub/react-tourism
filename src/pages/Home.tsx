import React from "react";

const FrontBanner = React.lazy(() => import("../components/Home/FrontBanner"));
const HomeSliders = React.lazy(() => import("../components/Home/HomeSliders"));

const Home = () => {
  return (
    <section className="space-y-8 divide-y-2">
      <FrontBanner />
      <HomeSliders />
    </section>
  );
};

export default Home;
