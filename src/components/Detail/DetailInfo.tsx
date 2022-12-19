import { lazy } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const AccommodationDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./AccommodationDetail"),
  ),
);
const CulturalFacilitiesDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./CulturalFacilitiesDetail"),
  ),
);
const FestivalDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./FestivalDetail"),
  ),
);
const LeisureSportsDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./LeisureSportsDetail"),
  ),
);
const RestaurantDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./RestaurantDetail"),
  ),
);
const ShoppingDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./ShoppingDetail"),
  ),
);
const TouristDestinationDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./TouristDestinationDetail"),
  ),
);
const TravelCourseDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./TravelCourseDetail"),
  ),
);

const DetailInfo = () => {
  const { detailInfoData, detailIntroData } = useOutletContext<any>();
  const { contentTypeId } = useParams();

  const accommodationMatch = contentTypeId === "32";
  const festivalMatch = contentTypeId === "15";
  const restaurantMatch = contentTypeId === "39";
  const shoppingMatch = contentTypeId === "38";
  const leisureSportsMatch = contentTypeId === "28";
  const culturalFacilitiesMatch = contentTypeId === "14";
  const touristDestinationMatch = contentTypeId === "12";
  const travelCourseMatch = contentTypeId === "25";

  return (
    <>
      {accommodationMatch && (
        <AccommodationDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
      {festivalMatch && (
        <FestivalDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
      {restaurantMatch && (
        <RestaurantDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
      {shoppingMatch && (
        <ShoppingDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
      {culturalFacilitiesMatch && (
        <CulturalFacilitiesDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
      {leisureSportsMatch && (
        <LeisureSportsDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
      {touristDestinationMatch && (
        <TouristDestinationDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
      {travelCourseMatch && (
        <TravelCourseDetail
          detailInfoData={detailInfoData}
          detailIntroData={detailIntroData}
        />
      )}
    </>
  );
};

export default DetailInfo;
