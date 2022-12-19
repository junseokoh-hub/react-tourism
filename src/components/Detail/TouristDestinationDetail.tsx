import React from "react";
import {
  TouristDestinationDetailInfoType,
  TouristDestinationDetailIntroType,
} from "../../types/TouristDestinationType";
import CommonDetailTable from "./CommonDetailTable";

type TouristDestinationDetailProps = {
  detailInfoData: TouristDestinationDetailInfoType[];
  detailIntroData: TouristDestinationDetailIntroType[];
};

const TouristDestinationDetail = ({
  detailInfoData,
  detailIntroData,
}: TouristDestinationDetailProps) => {
  return (
    <article className="mt-10 space-y-10">
      <ul className="space-y-5">
        {detailInfoData?.map((item) => (
          <li key={item.serialnum}>
            <CommonDetailTable item={item} />
          </li>
        ))}
      </ul>
      <hr />
      <ul className="pl-10 space-y-5">
        <li>
          <h3>소개 정보</h3>
        </li>
        {detailIntroData?.map((item) => (
          <li className="space-y-5" key={item.contentid}>
            <div>$ 펫 : {item.chkpet || "-"}</div>
            <div>$ 카드 : {item.chkcreditcard || "-"}</div>
            <div>$ 유모차 : {item.chkbabycarriage || "-"}</div>
            {item.expagerange && <div>$아이 : {item.expagerange}</div>}
            <div>$ 주차 : {item.parking || "-"}</div>
            <div>$ 문의 안내 : {item.infocenter || "-"}</div>
            <div>$ 이용 시기 : {item.useseason || "-"}</div>
            <div>$ 이용 시간 : {item.usetime || "-"}</div>
            <div>$ 휴무일 : {item.restdate || "-"}</div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(TouristDestinationDetail);
