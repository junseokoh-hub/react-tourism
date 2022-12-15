import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const indicators = [
  {
    src: "../../images/camping1.jpg",
    alt: "캠핑 직접 검색",
    path: "camping/input-search",
  },
  {
    src: "../../images/camping2.jpg",
    alt: "캠핑 지도 검색",
    path: "camping/map-search",
  },
];

const CampingIndicator = () => {
  const navigate = useNavigate();

  return (
    <section className="px-2 w-full space-y-7 dark:text-white">
      <h2>캠핑 가고 싶으시다면 여기로~!</h2>
      <Swiper
        className="home_swiper"
        loop={true}
        speed={2000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {indicators.map((idc) => (
          <SwiperSlide key={idc.alt} className="home_swiper-slide">
            <img
              className="w-full h-full block object-cover"
              src={idc.src}
              alt={idc.alt}
              loading="lazy"
              onClick={() => navigate(idc.path)}
            />
            <span className="absolute bottom-10 right-10">{idc.alt}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CampingIndicator;
