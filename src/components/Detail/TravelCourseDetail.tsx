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
  console.log(detailIntroData);

  return (
    <article className="mt-10 space-y-10">
      <div className="space-y-3">
        <ul className="space-y-10">
          {detailInfoData?.map((item) => (
            <li key={item.subnum}>
              <img src={item.subdetailimg} alt={item.subdetailalt} />
              <h3>{item.subname}</h3>
              <p>{item.subdetailoverview}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default TravelCourseDetail;
