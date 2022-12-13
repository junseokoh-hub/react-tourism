import { Suspense } from "react";
import { useQueries } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import { detailCommon, detailInfo, detailIntro } from "../../api/tourismApi";
import CommonDetail from "../../components/Detail/CommonDetail";
import OutletIndicator from "../../components/UI/OutletIndicator";
import SEOMeta from "../../SEOMeta";
import { DetailProps } from "../../types/DetailType";
import Loader from "../../utils/Loader";

const Detail = ({ contentType }: DetailProps) => {
  const { contentId, contentTypeId } = useParams();

  const [data, detailInfoData, detailIntroData] = useQueries([
    {
      queryKey: [`${contentType}-detailCommon`, contentId, contentTypeId],
      queryFn: () => {
        if (contentId) {
          return detailCommon(contentId);
        }
      },
    },
    {
      queryKey: [`${contentType}-detailInfo`, contentId, contentTypeId],
      queryFn: () => {
        if (contentId && contentTypeId) {
          return detailInfo(contentId, contentTypeId);
        }
      },
    },
    {
      queryKey: [`${contentType}-detailIntro`, contentId, contentTypeId],
      queryFn: () => {
        if (contentId && contentTypeId) {
          return detailIntro(contentId, contentTypeId);
        }
      },
    },
  ]);

  const isLoading =
    data.isLoading || detailInfoData.isLoading || detailIntroData.isLoading;

  const detailIndicators = [
    {
      match: `${contentType}/${contentId}/${contentTypeId}/detail`,
      path: "detail",
      title: "세부사항",
    },
    {
      match: `${contentType}/${contentId}/${contentTypeId}/map`,
      path: "map",
      title: "위치",
    },
  ];

  return (
    <>
      <SEOMeta
        title={data?.data?.title || contentType}
        content={data?.data?.overview || contentType}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <article className="space-y-4 dark:text-white">
          <CommonDetail data={data?.data} contentType={contentType} />
          <OutletIndicator indicators={detailIndicators} />
          <Suspense fallback={<Loader />}>
            <Outlet
              context={{
                data: data?.data,
                detailInfoData: detailInfoData?.data,
                detailIntroData: detailIntroData?.data,
              }}
            />
          </Suspense>
        </article>
      )}
    </>
  );
};

export default Detail;
