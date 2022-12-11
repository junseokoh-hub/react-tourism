import React from "react";
import {
  LeisureSportsDetailInfoType,
  LeisureSportsDetailIntroType,
} from "../../types/LeisureSportsType";

type LeisureSportsDetailProps = {
  detailInfoData: LeisureSportsDetailInfoType[];
  detailIntroData: LeisureSportsDetailIntroType[];
};

const LeisureSportsDetail = ({
  detailInfoData,
  detailIntroData,
}: LeisureSportsDetailProps) => {
  return (
    <article className="mt-10 space-y-10">
      <ul className="space-y-3">
        {detailInfoData?.map((item) => (
          <li key={item.serialnum}>
            <h3>{item.infoname}</h3>
            <h5>{item.infotext}</h5>
          </li>
        ))}
      </ul>
      <ul>
        {detailIntroData?.map((item) => (
          <li key={item.infocenterleports}>
            <span>이용 시간 : {item.usetimeleports}</span>
            <span>휴무일 : {item.restdateleports}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(LeisureSportsDetail);
