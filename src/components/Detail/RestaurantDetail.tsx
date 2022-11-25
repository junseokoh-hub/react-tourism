import {
  RestaurantDetailInfoType,
  RestaurantDetailIntroType,
} from "../../types/RestaurantType";

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
      <ul>
        {detailInfoData?.map((item) => (
          <li key={item.serialnum} className="flex flex-col">
            <span>{item.infoname}</span>
            <span>{item.infotext}</span>
          </li>
        ))}
      </ul>
      <ul>
        {detailIntroData?.map((item) => (
          <li key={item.lcnsno}>
            <span>{item.firstmenu}</span>
            <span>{item.opentimefood}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RestaurantDetail;
