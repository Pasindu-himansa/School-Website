import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import API from "../Services/api";
import { localize } from "../Services/localize";
import logo from "../assets/amv-logo.png";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HEIGHT = "h-[72vh] min-h-[440px] max-h-[760px]";

// Shown when no slides have been added yet
const FallbackHero = ({ t }) => (
  <section
    className={`relative flex items-center overflow-hidden bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 ${HEIGHT}`}
  >
    <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gold-300/20 blur-3xl" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
      <div className="text-white">
        <h1 className="animate-fade-up text-4xl leading-tight font-bold md:text-6xl">
          {t("navbar.schoolName")}
        </h1>
        <p className="mt-5 animate-fade-up text-lg text-maroon-100 [animation-delay:0.15s] md:text-xl">
          {t("footer.schoolText")}
        </p>
      </div>
      <img
        src={logo}
        alt=""
        className="mx-auto hidden w-72 animate-float drop-shadow-2xl md:block"
      />
    </div>
  </section>
);

const ArrowButton = ({ onClick, label, children, side }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:scale-110 hover:bg-gold-300 hover:text-maroon-900 md:block ${side}`}
  >
    {children}
  </button>
);

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiper, setSwiper] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    API.get("/hero")
      .then(({ data }) => setSlides(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={`skeleton rounded-none ${HEIGHT}`} />;
  if (slides.length === 0) return <FallbackHero t={t} />;

  const several = slides.length > 1;

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop={several}
        onSwiper={setSwiper}
        className={`hero-swiper ${HEIGHT}`}
      >
        {slides.map((slide) => {
          const title = localize(slide.title, lang);
          const subtitle = localize(slide.subtitle, lang);
          const buttonText = localize(slide.buttonText, lang);

          return (
            <SwiperSlide key={slide._id}>
              <div className={`relative overflow-hidden ${HEIGHT}`}>
                <div
                  className="hero-bg absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/45 to-maroon-950/10" />

                <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-20 md:items-center md:px-16 md:pb-0">
                  <div className="hero-text max-w-2xl text-white">
                    <h1 className="text-4xl leading-tight font-bold drop-shadow-lg md:text-6xl">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="mt-5 text-lg text-maroon-50 drop-shadow md:text-xl">
                        {subtitle}
                      </p>
                    )}
                    {buttonText && slide.buttonLink && (
                      <a
                        href={slide.buttonLink}
                        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-300 px-7 py-3 font-semibold text-maroon-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-200"
                      >
                        {buttonText}
                        <ArrowRight
                          className="h-5 w-5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {several && (
        <>
          <ArrowButton
            side="left-5"
            label={t("common.prevSlide")}
            onClick={() => swiper?.slidePrev()}
          >
            <ChevronLeft className="h-6 w-6" />
          </ArrowButton>
          <ArrowButton
            side="right-5"
            label={t("common.nextSlide")}
            onClick={() => swiper?.slideNext()}
          >
            <ChevronRight className="h-6 w-6" />
          </ArrowButton>
        </>
      )}
    </section>
  );
};

export default HeroSlider;
