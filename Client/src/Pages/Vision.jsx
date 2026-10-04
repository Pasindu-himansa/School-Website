import { useTranslation } from "react-i18next";
import { Gem, Quote, Target, Telescope } from "lucide-react";
import PageHeader from "../Components/PageHeader";
import Reveal from "../Components/Reveal";

const Vision = () => {
  const { t } = useTranslation();

  const cards = [
    { icon: Target, title: "vision.missionTitle", text: "vision.missionText" },
    { icon: Gem, title: "vision.valuesTitle", text: "vision.valuesText" },
  ];

  return (
    <div>
      <PageHeader icon={Telescope} title={t("vision.title")} />

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <figure className="relative rounded-3xl bg-white p-8 shadow-xl ring-1 shadow-stone-900/5 ring-stone-200/70 md:p-12">
            <Quote
              className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-gold-300 p-2.5 text-maroon-900 shadow-lg"
              aria-hidden="true"
            />
            <blockquote className="font-display text-xl leading-relaxed text-maroon-900 md:text-2xl">
              {t("vision.text")}
            </blockquote>
          </figure>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 150}>
              <div className="group h-full rounded-3xl bg-white p-8 shadow-lg ring-1 shadow-stone-900/5 ring-stone-200/70 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-maroon-800 text-gold-300 transition duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h2 className="text-2xl font-bold text-maroon-900">
                    {t(title)}
                  </h2>
                </div>
                <p className="mt-5 leading-relaxed text-stone-600">{t(text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Vision;
