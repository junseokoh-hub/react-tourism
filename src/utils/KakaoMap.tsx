import React, { useEffect } from "react";

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
        map.setDraggable(false);
        map.setZoomable(false);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <div id="map" className="mx-auto w-[500px] h-[500px] rounded-md"></div>
  );
};

export default KakaoMap;
