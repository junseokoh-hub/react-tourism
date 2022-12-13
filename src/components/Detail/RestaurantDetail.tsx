import React from "react";
import {
  RestaurantDetailInfoType,
  RestaurantDetailIntroType,
} from "../../types/RestaurantType";
import CommonDetailTable from "./CommonDetailTable";

type RestaurantDetailProps = {
  detailInfoData: RestaurantDetailInfoType[];
  detailIntroData: RestaurantDetailIntroType[];
};

const RestaurantDetail = ({
  detailInfoData,
  detailIntroData,
}: RestaurantDetailProps) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return (
    <article className="space-y-10">
      <ul>
        {detailInfoData?.map((item) => (
          <li key={item.serialnum} className="flex flex-col">
            <CommonDetailTable item={item} />
          </li>
        ))}
      </ul>
      <ul>
        {detailIntroData?.map((item) => (
          <li key={item.lcnsno}>
            <span>{item.firstmenu}</span>
            <span>{item.opentimefood}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(RestaurantDetail);
