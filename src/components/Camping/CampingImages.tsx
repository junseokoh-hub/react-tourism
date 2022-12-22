import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageList } from "../../api/campingApi";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import Loader from "../../utils/Loader.js";
import React from "react";

type CampingImagesProps = {
  isMenuOpen: boolean;
  contentId: string;
};

const CampingImages = ({ isMenuOpen, contentId }: CampingImagesProps) => {
  const { data, isLoading } = useQuery(
    ["camping_images", contentId],
    () => imageList(contentId),
    {
      enabled: !!isMenuOpen,
    },
  );

  return (
    <div className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
      {isLoading ? (
        <Loader position={"top-0"} />
      ) : data ? (
        <Swiper
          className="w-[50vw] h-[50vh] md:w-[40vw] lg:w-[30vw]"
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
        >
          {data?.map((img) => (
            <SwiperSlide key={img.serialnum}>
              <img
                src={img.imageUrl || "../images/noImage.jpg"}
                alt={contentId}
                className="w-full h-full block"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-3xl text-orange-500 font-bold dark:text-white">
          이미지가 없습니다.
        </div>
      )}
    </div>
  );
};

export default React.memo(CampingImages);
