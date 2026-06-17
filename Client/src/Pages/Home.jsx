import HeroSlider from "../Components/HeroSlider";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50">
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-blue-900">
              {t("home.card1Title")}
            </h3>
            <p className="mt-3 text-gray-600">{t("home.card1Text")}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-blue-900">
              {t("home.card2Title")}
            </h3>
            <p className="mt-3 text-gray-600">{t("home.card2Text")}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-blue-900">
              {t("home.card3Title")}
            </h3>
            <p className="mt-3 text-gray-600">{t("home.card3Text")}</p>
          </div>
        </div>
      </section>

      <section className="bg-red-900 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("home.title")}</h2>
          <p className="mt-4 text-lg text-blue-100">{t("home.subtitle")}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
