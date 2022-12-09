import { useSelector } from "../../store/hooks";
import KakaoMap from "../../utils/KakaoMap";

const CampingMapSearch = () => {
  const camps = useSelector((state) => state.camping.camping);

  console.log(camps);

  return (
    <>
      <KakaoMap latitude={37.5666805} longitude={126.9784147} />
      <ul className="mt-10 space-y-10">
        {camps ? (
          camps?.map((camp) => (
            <li className="flex dark:text-white" key={camp.contentId}>
              <img
                src={camp.firstImageUrl || "../images/noImage.jpg"}
                alt={camp.facltNm}
                className="w-1/2 h-1/2 block"
              />
              <ul>
                <li>이름 : {camp.facltNm}</li>
                <li>주소 : {camp.addr1}</li>
                <li>
                  <a
                    href={camp.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    홈페이지 링크
                  </a>
                </li>
                <li>연락처 : {camp.tel}</li>
              </ul>
            </li>
          ))
        ) : (
          <li>검색 결과가 없습니다.</li>
        )}
      </ul>
    </>
  );
};

export default CampingMapSearch;
