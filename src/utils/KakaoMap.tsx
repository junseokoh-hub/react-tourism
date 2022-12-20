import React, { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { locationBasedList } from "../api/campingApi";
import { onGetData } from "../store/slices/campingSlice";
import { useDispatch } from "../store/hooks";

declare global {
  interface Window {
    kakao: any;
    Kakao: any;
  }
}

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  infoWindow?: string;
};

const KakaoMap = ({ latitude, longitude, infoWindow }: KakaoMapProps) => {
  const campingMatch = useMatch("camping/*");
  const dispatch = useDispatch();

  let timer: any = 0;

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.defer = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_KEY
    }&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window?.kakao?.maps?.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 8,
        };
        const map = new window.kakao.maps.Map(container, options);
        if (!campingMatch) {
          const markerPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude,
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          let content = `<div class="p-1 bg-white text-black -translate-y-16 rounded-lg">${infoWindow}</div>`;
          let position = new window.kakao.maps.LatLng(latitude, longitude);

          let customOverlay = new window.kakao.maps.CustomOverlay({
            position,
            content,
          });

          customOverlay.setMap(map);

          map.setDraggable(false);
          map.setZoomable(false);
        }

        if (campingMatch) {
          window.kakao.maps.event.addListener(map, "idle", () => {
            let latlng = map.getCenter();
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(async () => {
              const data = await locationBasedList(
                latlng.getLng(),
                latlng.getLat(),
                "5000",
              );
              const array = [];
              for (let i = 0; i < data?.length; i++) {
                const position = {
                  title: data[i].facltNm,
                  latlng: new window.kakao.maps.LatLng(
                    data[i].mapY,
                    data[i].mapX,
                  ),
                };
                array.push(position);
              }
              dispatch(onGetData(data));
              let imageSrc =
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
              for (let i = 0; i < array.length; i++) {
                let imageSize = new window.kakao.maps.Size(24, 35);
                let markerImage = new window.kakao.maps.MarkerImage(
                  imageSrc,
                  imageSize,
                );
                let marker = new window.kakao.maps.Marker({
                  map,
                  position: array[i].latlng,
                  title: array[i].title,
                  image: markerImage,
                });
              }
            }, 1000);
          });
        }
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <>
      <div
        id="map"
        className="h-[400px] md:w-2/3 md:h-[500px] rounded-md"
      ></div>
      <div id="result" className="dark:text-white"></div>
    </>
  );
};

export default React.memo(KakaoMap);
