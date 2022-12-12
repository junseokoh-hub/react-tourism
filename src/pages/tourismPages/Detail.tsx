import { Suspense } from "react";
import { useQueries } from "react-query";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import { detailCommon, detailInfo, detailIntro } from "../../api/tourismApi";
import AccommodationDetail from "../../components/Detail/AccommodationDetail";
import CommonDetail from "../../components/Detail/CommonDetail";
import CulturalFacilitiesDetail from "../../components/Detail/CulturalFacilitiesDetail";
import FestivalDetail from "../../components/Detail/FestivalDetail";
import LeisureSportsDetail from "../../components/Detail/LeisureSportsDetail";
import RestaurantDetail from "../../components/Detail/RestaurantDetail";
import ShoppingDetail from "../../components/Detail/ShoppingDetail";
import TouristDestinationDetail from "../../components/Detail/TouristDestinationDetail";
import TravelCourseDetail from "../../components/Detail/TravelCourseDetail";
import { DetailProps } from "../../types/DetailType";
import Loader from "../../utils/Loader";

const Detail = ({ contentType }: DetailProps) => {
  const { contentId, contentTypeId } = useParams();

  const accommodationMatch = contentTypeId === "32";
  const festivalMatch = contentTypeId === "15";
  const restaurantMatch = contentTypeId === "39";
  const shoppingMatch = contentTypeId === "38";
  const leisureSportsMatch = contentTypeId === "28";
  const culturalFacilitiesMatch = contentTypeId === "14";
  const touristDestinationMatch = contentTypeId === "12";
  const travelCourseMatch = contentTypeId === "25";

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

  const detailMatch = useMatch(
    `/${contentType}/${contentId}/${contentTypeId}/detail`,
  );
  const mapMatch = useMatch(
    `/${contentType}/${contentId}/${contentTypeId}/map`,
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <article className="space-y-4 dark:text-white">
          <CommonDetail data={data?.data} contentType={contentType} />
          <nav className="flex shadow-md rounded-md dark:shadow-[0px_0px_3px_rgba(255,255,255,0.5)]">
            <Link
              to="detail"
              className="py-3 px-1 w-1/2 block text-lg text-center dark:text-white"
            >
              세부사항
              {detailMatch && (
                <div
                  className={
                    "mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500"
                  }
                />
              )}
            </Link>
            <Link
              to="map"
              className="py-3 w-1/2 block text-lg text-center dark:text-white"
            >
              위치
              {mapMatch && (
                <div className="mt-2 mx-auto w-1/2 h-1 rounded-md bg-blue-500 dark:bg-orange-500" />
              )}
            </Link>
          </nav>
          <Suspense fallback={<Loader />}>
            <Outlet context={data?.data} />
          </Suspense>
        </article>
      )}
    </>
  );
};

export default Detail;
