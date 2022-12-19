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
  console.log(detailIntroData);
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
      <hr />
      <ul className="mt-10">
        <li>
          <h3>소개 정보</h3>
        </li>
        {detailIntroData?.map((item) => (
          <li key={item.infocenterlodging}>
            <div>• 안내데스크 연락처 : {item.infocenterlodging || "-"}</div>
            <div>• 예약 연락처 : {item.reservationlodging || "-"}</div>
            <div>
              <span>• 체크인 : {item.checkintime || "-"} / </span>
              <span>체크아웃 : {item.checkouttime || "-"}</span>
            </div>
            <div>• 식당 : {item.foodplace || "-"}</div>
            <div>• 방 종류 : {item.roomtype || "-"}</div>
            <div>• 숙소 구조 : {item.scalelodging || "-"}</div>
            <div>• 주차 : {item.parkinglodging || "-"}</div>
            <div>• 픽업 : {item.pickup || "-"}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default React.memo(AccommodationDetail);
