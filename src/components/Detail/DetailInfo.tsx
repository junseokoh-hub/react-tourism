import { useOutletContext, useParams } from "react-router-dom";
import AccommodationDetail from "./AccommodationDetail";
import CulturalFacilitiesDetail from "./CulturalFacilitiesDetail";
import FestivalDetail from "./FestivalDetail";
import LeisureSportsDetail from "./LeisureSportsDetail";
import RestaurantDetail from "./RestaurantDetail";
import ShoppingDetail from "./ShoppingDetail";
import TouristDestinationDetail from "./TouristDestinationDetail";
import TravelCourseDetail from "./TravelCourseDetail";

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
