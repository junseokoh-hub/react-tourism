import { lazy, Suspense, useEffect } from "react";
import { useQueries } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import { detailCommon, detailInfo, detailIntro } from "../../api/tourismApi";
import SEOMeta from "../../SEOMeta";
import { DetailProps } from "../../types/DetailType";
import Loader from "../../utils/Loader";

const CommonDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 3000)).then(
    () => import("../../components/Detail/CommonDetail"),
  ),
);
const OutletIndicator = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 3000)).then(
    () => import("../../components/UI/OutletIndicator"),
  ),
);

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
    {
      match: `${contentType}/${contentId}/${contentTypeId}/review`,
      path: "review",
      title: "리뷰",
    },
  ];

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <SEOMeta
        title={data?.data?.title || contentType}
        content={data?.data?.overview || contentType}
      />
      {isLoading ? (
        <Loader position={"top-0"} />
      ) : (
        <article className="space-y-8 flex flex-col dark:text-white">
          <Suspense fallback={<Loader position={"top-0"} />}>
            <CommonDetail data={data?.data} contentType={contentType} />
          </Suspense>
          <Suspense fallback={<Loader position={"top-0"} />}>
            <OutletIndicator indicators={detailIndicators} />
          </Suspense>
          <Suspense fallback={<Loader position={"top-0"} />}>
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
