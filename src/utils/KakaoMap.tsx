import React, { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { locationBasedList } from "../api/campingApi";

declare global {
  interface Window {
    kakao: any;
  }
}

type KakaoMapProps = {
  latitude: number;
  longitude: number;
};

const KakaoMap = ({ latitude, longitude }: KakaoMapProps) => {
  const homeMatch = useMatch("/");
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
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        let content = `<div class="p-1 bg-teal-500 -translate-y-16 rounded-lg">Hello, World!</div>`;
        let position = markerPosition;

        let customOverlay = new window.kakao.maps.CustomOverlay({
          position,
          content,
        });

        customOverlay.setMap(map);

        // let iwContent = `<div class="w-full bg-teal-500">Hello, World</div>`;
        // let iwRemovable = true;

        // const infowindow = new window.kakao.maps.InfoWindow({
        //   content: iwContent,
        //   removable: iwRemovable,
        // });

        // window.kakao.maps.event.addListener(marker, "click", () => {
        //   infowindow.open(map, marker);
        // });

        if (!homeMatch) {
          map.setDraggable(false);
          map.setZoomable(false);
        }

        window.kakao.maps.event.addListener(map, "idle", () => {
          let latlng = map.getCenter();
          let message = `<p>중심좌표의 경도는 ${latlng}입니다.`;
          let result = document.getElementById("result");
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(async () => {
            const data = await locationBasedList(
              latlng.getLng(),
              latlng.getLat(),
            );
            console.log(data);
            if (result) {
              result.innerHTML = message;
              console.log("rendering");
            }
          }, 1000);
        });
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <>
      <div id="map" className="mx-auto w-[500px] h-[500px] rounded-md"></div>
      <div id="result" className="dark:text-white"></div>
    </>
  );
};

export default React.memo(KakaoMap);
