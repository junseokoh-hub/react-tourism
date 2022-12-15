import { lazy } from "react";
import { useOutletContext } from "react-router-dom";
import { DetailCommonType } from "../../types/DetailType";

const KakaoMap = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 3000)).then(
    () => import("../../utils/KakaoMap"),
  ),
);

const DetailMap = () => {
  const { data } = useOutletContext<{ data: DetailCommonType }>();

  return (
    <KakaoMap
      latitude={Number(data?.mapy)}
      longitude={Number(data?.mapx)}
      infoWindow={data?.addr1 || data?.addr2 || data?.title}
    />
  );
};

export default DetailMap;
