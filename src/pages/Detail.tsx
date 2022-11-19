import { useQueries } from "react-query";
import { useMatch, useParams } from "react-router-dom";
import { detailCommon, detailInfo, detailIntro } from "../api";
import AccommodationDetail from "../components/Detail/AccommodationDetail";
import FestivalDetail from "../components/Detail/FestivalDetail";
import { DetailProps } from "../types/DetailType";
import Loader from "../utils/Loader";

const Detail = ({ contentType }: DetailProps) => {
  const { contentId, contentTypeId } = useParams();
  const accommodationMatch = useMatch("accommodation/*");
  const festivalMatch = useMatch("festival/*");

  const [data, detailInfoData, detailIntroData] = useQueries([
    {
      queryKey: [`${contentType}-detailCommon`, contentId, contentTypeId],
      queryFn: () => detailCommon(contentId as string),
    },
    {
      queryKey: [`${contentType}-detailInfo`, contentId, contentTypeId],
      queryFn: () => detailInfo(contentId as string, contentTypeId as string),
    },
    {
      queryKey: [`${contentType}-detailIntro`, contentId, contentTypeId],
      queryFn: () => detailIntro(contentId as string, contentTypeId as string),
    },
  ]);

  const isLoading =
    data.isLoading || detailInfoData.isLoading || detailIntroData.isLoading;

  console.log("rendered");

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
              href={data?.data?.homepage || "#"}
              target={data?.data?.homepage && "_blank"}
              rel="noopener noreferrer"
            >
              홈페이지
            </a>
          </div>
        </div>
      )}
      {accommodationMatch && (
        <AccommodationDetail
          detailInfoData={detailInfoData.data}
          detailIntroData={detailIntroData.data}
        />
      )}
      {festivalMatch && (
        <FestivalDetail
          detailInfoData={detailInfoData.data}
          detailIntroData={detailIntroData.data}
        />
      )}
    </>
  );
};

export default Detail;
