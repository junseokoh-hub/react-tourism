import React from "react";
import {
  RestaurantDetailInfoType,
  RestaurantDetailIntroType,
} from "../../types/RestaurantType";
import CommonDetailTable from "./CommonDetailTable.js";

type RestaurantDetailProps = {
  detailInfoData: RestaurantDetailInfoType[];
  detailIntroData: RestaurantDetailIntroType[];
};

const RestaurantDetail = ({
  detailInfoData,
  detailIntroData,
}: RestaurantDetailProps) => {
  return (
    <article className="space-y-10">
      <ul className="space-y-5">
        {detailInfoData?.map((item) => (
          <li key={item.serialnum} className="flex flex-col">
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
          <li key={item.lcnsno} className="space-y-5">
            <div>• 대표메뉴 : {item.firstmenu || "-"}</div>
            <div>• 취급메뉴 : {item.treatmenu || "-"}</div>
            <div>• 영업시간 : {item.opentimefood || "-"}</div>
            <div>• 포장 : {item.packing || "-"}</div>
            <div>• 주차시설 : {item.parkingfood || "-"}</div>
            <div>• 문의 안내 : {item.infocenterfood || "-"}</div>
            <div>
              • 어린이 방 : {item.kidsfacility === "0" ? "없음" : "있음"}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(RestaurantDetail);
