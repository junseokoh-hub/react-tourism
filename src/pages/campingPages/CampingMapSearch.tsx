import CampingSearchedContent from "../../components/Camping/CampingSearchedContent";
import { useSelector } from "../../store/hooks";
import KakaoMap from "../../utils/KakaoMap";

const CampingMapSearch = () => {
  const camps = useSelector((state) => state.camping.camping);

  return (
    <>
      <KakaoMap latitude={37.5666805} longitude={126.9784147} />
      <ul className="mt-10 space-y-10">
        {camps ? (
          camps?.map((camp) => (
            <CampingSearchedContent key={camp.contentId} camp={camp} />
          ))
        ) : (
          <li className="dark:text-white">검색 결과가 없습니다.</li>
        )}
      </ul>
    </>
  );
};

export default CampingMapSearch;
