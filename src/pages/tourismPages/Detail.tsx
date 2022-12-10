import { User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { detailCommon, detailInfo, detailIntro } from "../../api/tourismApi";
import AccommodationDetail from "../../components/Detail/AccommodationDetail";
import CulturalFacilitiesDetail from "../../components/Detail/CulturalFacilitiesDetail";
import FestivalDetail from "../../components/Detail/FestivalDetail";
import LeisureSportsDetail from "../../components/Detail/LeisureSportsDetail";
import RestaurantDetail from "../../components/Detail/RestaurantDetail";
import ShoppingDetail from "../../components/Detail/ShoppingDetail";
import TouristDestinationDetail from "../../components/Detail/TouristDestinationDetail";
import TravelCourseDetail from "../../components/Detail/TravelCourseDetail";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useSelector } from "../../store/hooks";
import { DetailProps } from "../../types/DetailType";
import KakaoMap from "../../utils/KakaoMap";
import Loader from "../../utils/Loader";

const Detail = ({ contentType }: DetailProps) => {
  const { contentId, contentTypeId } = useParams();
  const [isPreferred, setIsPreferred] = useState(false);
  const { addDocument, response } = useFirestore("preference");
  const authUser = useSelector((state) => state.auth.user)!;

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

  const onClick = useCallback(
    (uid: string, title: string, overview: string) => {
      if (authUser) {
        addDocument({ uid, title, overview });
      }
    },
    [],
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-4 dark:text-white">
          <img
            className="mx-auto w-full h-[466px] block rounded-md"
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
          <ul className="space-y-5">
            <li className="space-x-5 flex items-center">
              <h3>{data?.data?.title}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-8 h-8 ${isPreferred ? "fill-red-500" : ""}`}
                onClick={() => {
                  if (data?.data && authUser) {
                    onClick(authUser.uid, data.data.title, data.data.overview);
                  }
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </li>
            <li
              className="leading-5"
              dangerouslySetInnerHTML={{
                __html: data?.data?.overview as string,
              }}
            ></li>
            <li>
              <span>{data?.data?.telname}</span>
              <span>{data?.data?.tel}</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: data?.data?.homepage || "#",
                }}
              />
            </li>
            <li>
              <KakaoMap
                latitude={Number(data?.data?.mapy)}
                longitude={Number(data?.data?.mapx)}
                infoWindow={
                  data?.data?.addr1 || data?.data?.addr2 || data?.data?.title
                }
              />
            </li>
          </ul>
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
