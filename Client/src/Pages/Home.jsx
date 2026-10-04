import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  CalendarDays,
  GraduationCap,
  Mail,
  Megaphone,
  Pin,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import HeroSlider from "../Components/HeroSlider";
import Reveal from "../Components/Reveal";
import API from "../Services/api";
import { formatDate, localize } from "../Services/localize";
import logo from "../assets/amv-logo.png";

const highlights = [
  { icon: GraduationCap, title: "home.card1Title", text: "home.card1Text" },
  { icon: ShieldCheck, title: "home.card2Title", text: "home.card2Text" },
  { icon: Sprout, title: "home.card3Title", text: "home.card3Text" },
];

const LatestNotifications = () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState(null); // null = loading

  useEffect(() => {
    API.get("/notifications")
      .then(({ data }) =>
        setItems(
          [...data].sort((a, b) => b.isSpecial - a.isSpecial).slice(0, 3),
        ),
      )
      .catch(() => setItems([]));
  }, []);

  if (items?.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-maroon-50 text-maroon-800">
              <Megaphone className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="text-3xl font-bold text-maroon-900">
              {t("home.latestTitle")}
            </h2>
          </div>
          <Link
            to="/notifications"
            className="group inline-flex items-center gap-1.5 font-semibold text-maroon-800 hover:text-maroon-600"
          >
            {t("home.viewAll")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {items === null
            ? [0, 1, 2].map((i) => <div key={i} className="skeleton h-52" />)
            : items.map((item, i) => (
                <Reveal key={item._id} delay={i * 120}>
                  <Link
                    to="/notifications"
                    className={`group flex h-full flex-col rounded-2xl border bg-stone-50 p-6 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl ${
                      item.isSpecial ? "border-gold-300" : "border-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {formatDate(item.createdAt, i18n.language)}
                      {item.isSpecial && (
                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-gold-300 px-2.5 py-0.5 text-xs font-semibold text-maroon-900">
                          <Pin className="h-3 w-3" aria-hidden="true" />
                          {t("notifications.special")}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 line-clamp-2 text-xl font-bold text-maroon-900 group-hover:text-maroon-700">
                      {localize(item.title, i18n.language)}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-stone-600">
                      {localize(item.summary, i18n.language) ||
                        localize(item.content, i18n.language)}
                    </p>
                  </Link>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <HeroSlider />

      {/* Highlights, overlapping the hero */}
      <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-xl ring-1 shadow-stone-900/5 ring-stone-200/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-maroon-50 text-maroon-800 transition duration-300 group-hover:rotate-6 group-hover:bg-maroon-800 group-hover:text-gold-300">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-maroon-900">
                  {t(title)}
                </h3>
                <p className="mt-3 leading-relaxed text-stone-600">{t(text)}</p>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-gold-300 transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="relative mt-20 overflow-hidden bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 py-20 text-white">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-gold-300/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-gold-300 uppercase">
              {t("navbar.schoolName")}
            </p>
            <h2 className="mt-4 text-4xl leading-tight font-bold md:text-5xl">
              {t("home.title")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-maroon-100">
              {t("home.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/vision"
                className="group inline-flex items-center gap-2 rounded-full bg-gold-300 px-6 py-3 font-semibold text-maroon-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-200"
              >
                {t("home.learnMore")}
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-300"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                {t("contact.title")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="flex justify-center md:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-full bg-gold-300/25 blur-2xl" />
              <img
                src={logo}
                alt=""
                className="relative w-56 animate-float drop-shadow-2xl md:w-72"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <LatestNotifications />
    </div>
  );
};

export default Home;
