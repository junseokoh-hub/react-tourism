import React from "react";
import SEOMeta from "../SEOMeta";

const FrontBanner = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("../components/Home/FrontBanner"),
  ),
);
const CampingIndicator = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("../components/Home/CampingIndicator"),
  ),
);

const VisitorData = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 3000)).then(
    () => import("../components/Home/VisitorData"),
  ),
);

const Home = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return (
    <>
      <SEOMeta
        title={"홈"}
        content={"여행을 떠나고 싶을 때 미리 정보를 확인해 계획을 세워보세요!"}
      />
      <section className="space-y-8 divide-y-2">
        <FrontBanner />
        <CampingIndicator />
        <VisitorData />
      </section>
    </>
  );
};

export default Home;
