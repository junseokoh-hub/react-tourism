import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { detailCommon, detailInfo } from "../api";
import { DetailCommonType, DetailInfoType } from "../types/DetailType";
import Loader from "../utils/Loader";

const Detail = () => {
  const { contentId, contentTypeId } = useParams();

  const { data, isLoading } = useQuery<DetailCommonType>(
    ["accommodation-detail", contentId],
    () => detailCommon(contentId as string),
  );

  const { data: detailInfoData, isLoading: detailInfoLoading } = useQuery<
    DetailInfoType[]
  >(["accommodation-detailInfo", contentId], () =>
    detailInfo(contentId as string, contentTypeId as string),
  );

  console.log(detailInfoData);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="space-y-4">
          <img
            className="w-48 h-48"
            src={data?.firstimage || data?.firstimage2}
          />
          <h3>{data?.title}</h3>
          <h4>{data?.overview}</h4>
          <div>
            <span>{data?.telname}</span>
            <span>{data?.tel}</span>
            <a href={data?.homepage} target="_blank" rel="noopener noreferrer">
              홈페이지
            </a>
          </div>
        </div>
      )}
      {!detailInfoLoading &&
        detailInfoData &&
        detailInfoData.map((item) => (
          <p key={item.roomcode}>{item.roomtitle}</p>
        ))}
    </>
  );
};

export default Detail;
