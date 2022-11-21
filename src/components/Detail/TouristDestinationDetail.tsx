import {
  TouristDestinationDetailInfoType,
  TouristDestinationDetailIntroType,
} from "../../types/TouristDestinationType";

type TouristDestinationDetailProps = {
  detailInfoData: TouristDestinationDetailInfoType[];
  detailIntroData: TouristDestinationDetailIntroType[];
};

const TouristDestinationDetail = ({
  detailInfoData,
  detailIntroData,
}: TouristDestinationDetailProps) => {
  console.log(detailInfoData);

  return (
    <article className="mt-10 space-y-10">
      <div className="space-y-3">
        <ul>
          {detailInfoData?.map((item) => (
            <li key={item.serialnum}>
              <h3>
                {item.infoname} : {item.infotext}
              </h3>
            </li>
          ))}
        </ul>
        <ul>
          {detailIntroData?.map((item) => (
            <li key={item.contentid}>
              <h3>펫 : {item.chkpet}</h3>
              <h3>카드 : {item.chkcreditcard}</h3>
              <h3>유모차 : {item.chkbabycarriage}</h3>
              {item.expagerange && <h3>아이 : {item.expagerange}</h3>}
              <h3>주차 : {item.parking}</h3>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default TouristDestinationDetail;
