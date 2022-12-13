import React from "react";
import {
  TravelCourseDetailInfoType,
  TravelCourseDetailIntroType,
} from "../../types/TravelCourseType";

type TravelCourseDetailProps = {
  detailInfoData: TravelCourseDetailInfoType[];
  detailIntroData: TravelCourseDetailIntroType[];
};

const TravelCourseDetail = ({
  detailInfoData,
  detailIntroData,
}: TravelCourseDetailProps) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return (
    <article className="mt-10 space-y-10">
      <div className="space-y-3">
        <ul className="space-y-10">
          {detailInfoData?.map((item) => (
            <li className="text-center" key={item.subnum}>
              <img
                className="block w-full rounded-md"
                src={
                  item.subdetailimg
                    ? `https://${item.subdetailimg.slice(7)}`
                    : "../../images/noImage.jpg"
                }
                alt={item.subdetailalt || item.subname}
              />
              <h3 className="mt-4">{item.subname}</h3>
              <p className="leading-9">{item.subdetailoverview}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default React.memo(TravelCourseDetail);
