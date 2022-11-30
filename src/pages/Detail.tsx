import { useEffect } from "react";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { detailCommon, detailInfo, detailIntro } from "../api/tourismApi";
import AccommodationDetail from "../components/Detail/AccommodationDetail";
import CulturalFacilitiesDetail from "../components/Detail/CulturalFacilitiesDetail";
import FestivalDetail from "../components/Detail/FestivalDetail";
import LeisureSportsDetail from "../components/Detail/LeisureSportsDetail";
import RestaurantDetail from "../components/Detail/RestaurantDetail";
import ShoppingDetail from "../components/Detail/ShoppingDetail";
import TouristDestinationDetail from "../components/Detail/TouristDestinationDetail";
import TravelCourseDetail from "../components/Detail/TravelCourseDetail";
import { DetailProps } from "../types/DetailType";
import Loader from "../utils/Loader";

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

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="space-y-4">
          <img
            className="w-[699px] h-[466px] block rounded-md"
            src={
              data?.data?.firstimage || data?.data?.firstimage2
                ? `https://${
                    data?.data?.firstimage.slice(7) ||
                    data?.data?.firstimage2.slice(7)
                  }`
                : "../../images/noImage.jpg"
            }
            alt={data?.data?.title}
          />
          <h3>{data?.data?.title}</h3>
          <p className="leading-10">{data?.data?.overview}</p>
          <div>
            <span>{data?.data?.telname}</span>
            <span>{data?.data?.tel}</span>
            <div id="homepage"></div>
            {/* <a
              href={data?.data?.homepage || "#"}
              target={data?.data?.homepage && "_blank"}
              rel="noopener noreferrer"
            >
              홈페이지
            </a> */}
            <div
              dangerouslySetInnerHTML={{ __html: data?.data?.homepage || "#" }}
            ></div>
          </div>
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
      )}
    </>
  );
};

export default Detail;
