import React from "react";
import {
  FestivalDetailInfoType,
  FestivalDetailIntroType,
} from "../../types/FestivalType";
import CommonDetailTable from "./CommonDetailTable";

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
      <div className="mt-3">
        {detailIntroData?.map((item, index) => (
          <div className="space-y-3" key={index}>
            <div>{item.eventplace}</div>
            <h3>
              {item.eventstartdate} ~ {item.eventenddate}
            </h3>
            <h4>{item.sponsor1tel}</h4>
          </div>
        ))}
      </div>
    </article>
  );
};

export default React.memo(FestivalDetail);
