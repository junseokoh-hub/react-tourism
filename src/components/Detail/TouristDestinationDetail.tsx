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
      <div className="space-y-3">
        <ul className="space-y-5">
          {detailInfoData?.map((item) => (
            <li key={item.serialnum}>
              <CommonDetailTable item={item} />
            </li>
          ))}
        </ul>
        <ul>
          {detailIntroData?.map((item) => (
            <li key={item.contentid}>
              <h4>펫 : {item.chkpet}</h4>
              <h4>카드 : {item.chkcreditcard}</h4>
              <h4>유모차 : {item.chkbabycarriage}</h4>
              {item.expagerange && <h4>아이 : {item.expagerange}</h4>}
              <h4>주차 : {item.parking}</h4>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default React.memo(TouristDestinationDetail);
