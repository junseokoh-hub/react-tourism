import { useCallback } from "react";
import { useSelector } from "../store/hooks";
import KakaoMap from "../utils/KakaoMap";

const CampingMapSearch = () => {
  const camps = useSelector((state) => state.camping.camping);

  const newData = useCallback(() => {
    const array = [];
    for (let i = 0; i < camps.length; i++) {
      const position = {
        title: camps[i].facltNm,
        latlng: new window.kakao.maps.LatLng(camps[i].mapY, camps[i].mapX),
      };
      array.push(position);
    }
    return array;
  }, [camps]);

  console.log(camps);

  return (
    <article>
      <KakaoMap latitude={37.5666805} longitude={126.9784147} />
      <ul>
        {camps?.map((camp) => (
          <li key={camp.contentId}>{camp.addr1}</li>
        ))}
        {camps === undefined && <li>검색 결과가 없습니다.</li>}
      </ul>
    </article>
  );
};

export default CampingMapSearch;
