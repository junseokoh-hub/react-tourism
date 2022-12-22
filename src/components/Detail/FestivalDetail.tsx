import React from "react";
import {
  FestivalDetailInfoType,
  FestivalDetailIntroType,
} from "../../types/FestivalType";
import CommonDetailTable from "./CommonDetailTable.js";

type FestivalDetailProps = {
  detailInfoData: FestivalDetailInfoType[];
  detailIntroData: FestivalDetailIntroType[];
};

const FestivalDetail = ({
  detailInfoData,
  detailIntroData,
}: FestivalDetailProps) => {
  return (
    <article className="space-y-10">
      <div className="space-y-3">
        {detailInfoData?.map(
          (item) =>
            item.infotext && (
              <div key={item.serialnum}>
                <CommonDetailTable item={item} />
              </div>
            ),
        )}
      </div>
      <hr />
      <ul className="mt-3 pl-10 space-y-5">
        <li>
          <h3>소개 정보</h3>
        </li>
        {detailIntroData?.map((item) => (
          <li className="space-y-3" key={item.eventplace}>
            <div>• 행사 장소 : {item.eventplace}</div>
            <div>
              • 행사 기간 : {item.eventstartdate} ~ {item.eventenddate}
            </div>
            <div>
              • 스폰서 : {item.sponsor1} ({item.sponsor1tel}), {item.sponsor2}
              <br />({item.sponsor1tel})
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(FestivalDetail);
