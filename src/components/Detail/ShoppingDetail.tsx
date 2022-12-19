import React from "react";
import {
  ShoppingDetailInfoType,
  ShoppingDetailIntroType,
} from "../../types/ShoppingType";
import CommonDetailTable from "./CommonDetailTable";

type ShoppingDetailProps = {
  detailInfoData: ShoppingDetailInfoType[];
  detailIntroData: ShoppingDetailIntroType[];
};

const ShoppingDetail = ({
  detailInfoData,
  detailIntroData,
}: ShoppingDetailProps) => {
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
          <li key={item.shopguide} className="space-y-5">
            <div>$ 영업일 : {item.fairday || "-"}</div>
            <div>$ 영업시간 : {item.opentime || "-"}</div>
            <div>$ 휴일 : {item.restdateshopping || "-"}</div>
            <div>$ 판매 품목 : {item.saleitem || "-"}</div>
            <div>$ 주차 : {item.parkingshopping || "-"}</div>
            <div>$ 카드 사용 : {item.chkcreditcardshopping || "-"}</div>
            <div>$ 매장 안내 : {item.shopguide || "-"}</div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(ShoppingDetail);
