import React from "react";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { detailInfo, detailIntro } from "../../api/tourismApi";
import { DetailProps } from "../../types/DetailType";
import AccommodationDetail from "./AccommodationDetail";
import CulturalFacilitiesDetail from "./CulturalFacilitiesDetail";
import FestivalDetail from "./FestivalDetail";
import LeisureSportsDetail from "./LeisureSportsDetail";
import RestaurantDetail from "./RestaurantDetail";
import ShoppingDetail from "./ShoppingDetail";
import TouristDestinationDetail from "./TouristDestinationDetail";
import TravelCourseDetail from "./TravelCourseDetail";

const DetailContents = ({ contentType }: DetailProps) => {
  const { contentId, contentTypeId } = useParams();
  console.log(contentTypeId);

  const [detailInfoData, detailIntroData] = useQueries([
    {
      queryKey: [`${contentType}-detailInfo`, contentId, contentTypeId],
      queryFn: () => detailInfo(contentId as string, contentTypeId as string),
    },
    {
      queryKey: [`${contentType}-detailIntro`, contentId, contentTypeId],
      queryFn: () => detailIntro(contentId as string, contentTypeId as string),
    },
  ]);

  const accommodationMatch = contentTypeId === "32";
  const festivalMatch = contentTypeId === "15";
  const restaurantMatch = contentTypeId === "39";
  const shoppingMatch = contentTypeId === "38";
  const leisureSportsMatch = contentTypeId === "28";
  const culturalFacilitiesMatch = contentTypeId === "14";
  const touristDestinationMatch = contentTypeId === "12";
  const travelCourseMatch = contentTypeId === "25";
  return (
    <div>
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
    </div>
  );
};

export default React.memo(DetailContents);
