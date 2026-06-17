import { useEffect, useState } from "react";
import API from "../services/api";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await API.get("/hero");
        setSlides(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      loop={true}
      className="h-[500px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide._id}>
          <div
            className="flex h-[500px] items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="bg-black/50 p-10 text-center text-white rounded-xl">
              <h1 className="text-4xl font-bold">
                {slide.title[i18n.language]}
              </h1>

              <p className="mt-4 text-lg">{slide.subtitle[i18n.language]}</p>

              {slide.buttonText && (
                <a
                  href={slide.buttonLink}
                  className="mt-6 inline-block rounded bg-yellow-400 px-6 py-2 font-semibold text-blue-900"
                >
                  {slide.buttonText[i18n.language]}
                </a>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
