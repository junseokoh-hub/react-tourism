import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import OutletIndicator from "../../components/UI/OutletIndicator.js";
import SEOMeta from "../../SEOMeta";
import Loader from "../../utils/Loader.js";

const Camping = () => {
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  const campingIndicators = [
    {
      match: "camping/input-search",
      path: "input-search",
      title: "검색으로 찾기",
    },
    { match: "camping/map-search", path: "map-search", title: "지도로 찾기" },
  ];

  return (
    <>
      <SEOMeta
        title={"캠핑 검색"}
        content={"캠핑을 떠나고 싶으시다면 검색해보아요"}
      />

      <section>
        <OutletIndicator indicators={campingIndicators} />
        <article className="mt-10">
          <Suspense fallback={<Loader position={"top-0"} />}>
            <Outlet />
          </Suspense>
        </article>
      </section>
    </>
  );
};

export default Camping;
