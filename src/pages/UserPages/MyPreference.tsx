import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import OutletIndicator from "../../components/UI/OutletIndicator";
import SEOMeta from "../../SEOMeta";
import Loader from "../../utils/Loader";

const MyPreference = () => {
  const preferenceIndicators = [
    { match: "myPreference/tourism", path: "tourism", title: "여행지" },
    { match: "myPreference/camping", path: "camping", title: "캠핑지" },
  ];

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
      <SEOMeta title={"나의 선호"} content={"내가 선호하는 여행지"} />
      <article className="flex flex-col">
        <OutletIndicator indicators={preferenceIndicators} />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </article>
    </>
  );
};

export default MyPreference;
