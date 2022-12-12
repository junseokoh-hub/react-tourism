import { useOutletContext } from "react-router-dom";
import { DetailCommonType } from "../../types/DetailType";
import KakaoMap from "../../utils/KakaoMap";

const DetailMap = () => {
  const data = useOutletContext<DetailCommonType>();

  return (
    <KakaoMap
      latitude={Number(data?.mapy)}
      longitude={Number(data?.mapx)}
      infoWindow={data?.addr1 || data?.addr2 || data?.title}
    />
  );
};

export default DetailMap;
