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
      <div className="mt-3 grid grid-cols-1 gap-2 text-center">
        {detailInfoData?.map((item) => (
          <div key={item.roomcode} className="space-y-2">
            <img
              className="w-full h-60 block"
              src={item.roomimg1 || item.roomimg2 || "../../images/noImage.jpg"}
              alt={item.roomimg1alt || item.roomimg2alt}
            />
            <p>{item.roomtitle}</p>
          </div>
        ))}
      </div>
      {detailIntroData?.map((item) => (
        <div key={item.infocenterlodging}>{item.infocenterlodging}</div>
      ))}
    </>
  );
};

export default React.memo(AccommodationDetail);
