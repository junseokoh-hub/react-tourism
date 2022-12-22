import { lazy } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const AccommodationDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./AccommodationDetail.js"),
  ),
);
const CulturalFacilitiesDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./CulturalFacilitiesDetail.js"),
  ),
);
const FestivalDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./FestivalDetail.js"),
  ),
);
const LeisureSportsDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./LeisureSportsDetail.js"),
  ),
);
const RestaurantDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./RestaurantDetail.js"),
  ),
);
const ShoppingDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./ShoppingDetail.js"),
  ),
);
const TouristDestinationDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./TouristDestinationDetail.js"),
  ),
);
const TravelCourseDetail = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("./TravelCourseDetail.js"),
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
