import React from "react";
import {
  CulturalFacilitiesDetailInfoType,
  CulturalFacilitiesDetailIntroType,
} from "../../types/CulturalFacilitiesType";
import CommonDetailTable from "./CommonDetailTable";

type CulturalFacilitiesDetailProps = {
  detailInfoData: CulturalFacilitiesDetailInfoType[];
  detailIntroData: CulturalFacilitiesDetailIntroType[];
};

const CulturalFacilitiesDetail = ({
  detailInfoData,
  detailIntroData,
}: CulturalFacilitiesDetailProps) => {
  return (
    <article className="space-y-10">
      <ul className="space-y-5">
        {detailInfoData?.map((item) => (
          <li key={item.serialnum}>
            <CommonDetailTable item={item} />
          </li>
        ))}
      </ul>
      <hr />
      <ul className="space-y-3 dark:text-white">
        {detailIntroData?.map((item) => (
          <li key={item.contentid}>
            <h4>펫 : {item.chkpetculture || "-"}</h4>
            <h4>카드 : {item.chkcreditcardculture || "-"}</h4>
            <h4>유모차 : {item.chkbabycarriageculture || "-"}</h4>
            <h4>주차 : {item.parkingculture || "-"}</h4>
            <h4>가격 : {item.usefee || "-"}</h4>
            <h4>운영 : {item.usetimeculture || "-"}</h4>
            <h4>휴무일 : {item.restdateculture || "-"}</h4>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(CulturalFacilitiesDetail);
