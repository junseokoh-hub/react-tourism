import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { detailCommon, detailInfo, detailIntro } from "../api";
import Loader from "../utils/Loader";

const Detail = () => {
  const { contentId, contentTypeId } = useParams();

  const [data, detailInfoData, detailIntroData] = useQueries([
    {
      queryKey: ["accommodation-detailCommon", contentId],
      queryFn: () => detailCommon(contentId),
    },
    {
      queryKey: ["accommodation-detailInfo", contentId],
      queryFn: () => detailInfo(contentId, contentTypeId),
    },
    {
      queryKey: ["accommodation-detailIntro", contentId],
      queryFn: () => detailIntro(contentId, contentTypeId),
    },
  ]);

  const isLoading =
    data.isLoading || detailInfoData.isLoading || detailIntroData.isLoading;

  console.log(detailIntroData.data);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="space-y-4">
          <img
            className="w-48 h-48 block"
            src={
              data?.data?.firstimage ||
              data?.data?.firstimage2 ||
              "../../images/noImage.jpg"
            }
          />
          <h3>{data?.data?.title}</h3>
          <h4>{data?.data?.overview}</h4>
          <div>
            <span>{data?.data?.telname}</span>
            <span>{data?.data?.tel}</span>
            <a
              href={data?.data?.homepage || "javascript:void(0);"}
              target={data?.data?.homepage && "_blank"}
              rel="noopener noreferrer"
            >
              홈페이지
            </a>
          </div>
        </div>
      )}
      {/* <div className="mt-3 grid grid-cols-1 gap-2 text-center">
        {detailInfoData.data?.map((item) => (
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
      {detailIntroData.data?.map((item) => (
        <div key={item.infocenterlodging}>{item.infocenterlodging}</div>
      ))} */}
    </>
  );
};

export default Detail;
