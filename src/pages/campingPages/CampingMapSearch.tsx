import { lazy, Suspense } from "react";
import CampingSearchedContent from "../../components/Camping/CampingSearchedContent.js";
import { useSelector } from "../../store/hooks";
import Loader from "../../utils/Loader.js";

const KakaoMap = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 3000)).then(
    () => import("../../utils/KakaoMap.js"),
  ),
);

const CampingMapSearch = () => {
  const camps = useSelector((state) => state.camping.camping);

  return (
    <>
      <Suspense fallback={<Loader position={"top-0"} />}>
        <KakaoMap latitude={37.5666805} longitude={126.9784147} />
      </Suspense>
      <ul className="mt-10 space-y-10 flex flex-col">
        {camps ? (
          camps?.map((camp) => (
            <CampingSearchedContent key={camp.contentId} camp={camp} />
          ))
        ) : (
          <li className="text-center dark:text-white">검색 결과가 없습니다.</li>
        )}
      </ul>
    </>
  );
};

export default CampingMapSearch;
