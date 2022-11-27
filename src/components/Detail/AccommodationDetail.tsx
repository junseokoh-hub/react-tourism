import React from "react";
import {
  AccommodationDetailInfoType,
  AccommodationDetailIntroType,
} from "../../types/AccommodationType";

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
      <div className="mt-3 grid grid-cols-1 gap-2 text-center md:grid-cols-2">
        {detailInfoData?.map((item) => (
          <div key={item.roomcode} className="space-y-2">
            <img
              className="w-full h-60 block rounded-md"
              src={
                item.roomimg1 || item.roomimg2
                  ? `https://${
                      item.roomimg1.slice(7) || item.roomimg2.slice(7)
                    }`
                  : "../../images/noImage.jpg"
              }
              alt={item.roomimg1alt || item.roomimg2alt}
            />
            <h3>{item.roomtitle}</h3>
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
