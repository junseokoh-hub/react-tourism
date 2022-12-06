import { useSelector } from "../../store/hooks";
import KakaoMap from "../../utils/KakaoMap";

const CampingMapSearch = () => {
  const camps = useSelector((state) => state.camping.camping);

  console.log(camps);

  return (
    <article>
      <KakaoMap latitude={37.5666805} longitude={126.9784147} />
      <ul>
        {camps ? (
          camps?.map((camp) => (
            <li className="dark:text-white" key={camp.contentId}>
              {camp.addr1}
            </li>
          ))
        ) : (
          <li>검색 결과가 없습니다.</li>
        )}
      </ul>
    </article>
  );
};

export default CampingMapSearch;
