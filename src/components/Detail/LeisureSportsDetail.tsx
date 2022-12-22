import React from "react";
import {
  LeisureSportsDetailInfoType,
  LeisureSportsDetailIntroType,
} from "../../types/LeisureSportsType";
import CommonDetailTable from "./CommonDetailTable.js";

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
          <li className="space-y-5" key={item.infocenterleports}>
            <div>• 개장 기간 : {item.openperiod || "-"}</div>
            <div>
              • 이용 시간 :
              {item.usetimeleports.replace(/<[^>]*>?/g, " -") || "-"}
            </div>
            <div>• 휴무일 : {item.restdateleports || "-"}</div>
            <div>• 체험가능연령 : {item.expagerangeleports || "-"}</div>
            <div>• 애완동물 동반여부 : {item.chkpetleports || "-"}</div>
            <div>• 문의 안내 : {item.infocenterleports || "-"}</div>
            <div>• 예약 안내 : {item.reservation || "-"}</div>
            <div>• 주차 시설 : {item.parkingleports || "-"}</div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(LeisureSportsDetail);
