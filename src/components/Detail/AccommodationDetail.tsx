import React from "react";
import {
  AccommodationDetailInfoType,
  AccommodationDetailIntroType,
} from "../../types/AccommodationType";
import AccommodationDetailTable from "./AccommodationDetailTable";

type AccommodationDetailProps = {
  detailInfoData: AccommodationDetailInfoType[];
  detailIntroData: AccommodationDetailIntroType[];
};

const AccommodationDetail = ({
  detailInfoData,
  detailIntroData,
}: AccommodationDetailProps) => {
  return (
    <>
      <div className="mt-3 space-y-10">
        {detailInfoData?.map((item) => (
          <div key={item.roomcode} className="min-h-3/4 space-x-2 flex">
            <img
              className="w-1/2 md:w-1/3 block rounded-md"
              src={
                item.roomimg1 || item.roomimg2
                  ? `https://${
                      item.roomimg1.slice(7) || item.roomimg2.slice(7)
                    }`
                  : "../../images/noImage.jpg"
              }
              alt={item.roomimg1alt || item.roomimg2alt}
            />
            <AccommodationDetailTable item={item} />
          </div>
        ))}
      </div>
      <details open className="mt-10">
        <summary className="font-bold cursor-pointer">⁕ 세부 내용</summary>
        <ul className="border border-solid border-gray-800 rounded-sm">
          {detailIntroData?.map((item) => (
            <li key={item.infocenterlodging}>
              <div>• 연락처 : {item.infocenterlodging}</div>
              <div>
                <span>• 체크인 : {item.checkintime} / </span>
                <span>체크아웃 : {item.checkouttime}</span>
              </div>
              <div>• 식당 : {item.foodplace}</div>
              <div>• 방 종류 : {item.roomtype}</div>
              <div>• 숙소 구조 : {item.scalelodging}</div>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
};

export default React.memo(AccommodationDetail);
