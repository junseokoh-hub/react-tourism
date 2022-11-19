import {
  ShoppingDetailInfoType,
  ShoppingDetailIntroType,
} from "../../types/ShoppingType";

type ShoppingDetailProps = {
  detailInfoData: ShoppingDetailInfoType[];
  detailIntroData: ShoppingDetailIntroType[];
};

const ShoppingDetail = ({
  detailInfoData,
  detailIntroData,
}: ShoppingDetailProps) => {
  console.log(detailIntroData);
  return (
    <article className="space-y-10">
      <ul>
        {detailIntroData?.map((item) => (
          <li key={item.shopguide} className="space-y-3">
            <span>{item.fairday}</span>
            <span>{item.opentime}</span>
            <p>{item.saleitem}</p>
            <p>주차 : {item.parkingshopping}</p>
            <p>카드 사용 : {item.chkcreditcardshopping}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ShoppingDetail;