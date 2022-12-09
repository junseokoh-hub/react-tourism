import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageList } from "../../api/campingApi";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

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

  console.log(data);

  return (
    <div className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100px]">
      <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
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
    </div>
  );
};

export default CampingImages;
