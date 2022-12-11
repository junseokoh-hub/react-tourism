import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <article className="space-y-4 dark:text-white">
          <CommonDetail data={data?.data} contentType={contentType} />
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
          {restaurantMatch && (
            <RestaurantDetail
              detailInfoData={detailInfoData.data}
              detailIntroData={detailIntroData.data}
            />
          )}
          {shoppingMatch && (
            <ShoppingDetail
              detailInfoData={detailInfoData.data}
              detailIntroData={detailIntroData.data}
            />
          )}
          {culturalFacilitiesMatch && (
            <CulturalFacilitiesDetail
              detailInfoData={detailInfoData.data}
              detailIntroData={detailIntroData.data}
            />
          )}
          {leisureSportsMatch && (
            <LeisureSportsDetail
              detailInfoData={detailInfoData.data}
              detailIntroData={detailIntroData.data}
            />
          )}
          {touristDestinationMatch && (
            <TouristDestinationDetail
              detailInfoData={detailInfoData.data}
              detailIntroData={detailIntroData.data}
            />
          )}
          {travelCourseMatch && (
            <TravelCourseDetail
              detailInfoData={detailInfoData.data}
              detailIntroData={detailIntroData.data}
            />
          )}
        </article>
      )}
    </>
  );
};

export default Detail;
