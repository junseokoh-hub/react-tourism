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
  return (
    <article className="mt-10 space-y-10">
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
      <hr />
      <ul className="pl-10 space-y-5">
        <li>
          <h3>소개 정보</h3>
        </li>
        {detailIntroData?.map((item) => (
          <li className="space-y-5" key={item.distance}>
            <div>• 코스 거리 : {item.distance || "-"}</div>
            <div>• 코스 소요시간 : {item.taketime || "-"}</div>
            <div>• 코스 일정 : {item.schedule || "-"}</div>
            <div>• 코스 테마 : {item.theme || "-"}</div>
            <div>• 문의 안내 : {item.infocentertourcourse || "-"}</div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default React.memo(TravelCourseDetail);
