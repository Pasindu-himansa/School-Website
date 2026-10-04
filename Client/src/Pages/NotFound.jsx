import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Compass, House } from "lucide-react";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <span className="mx-auto flex h-24 w-24 animate-float items-center justify-center rounded-full bg-maroon-50 text-maroon-800 ring-8 ring-maroon-50/50">
          <Compass className="h-12 w-12" aria-hidden="true" />
        </span>
        <p className="mt-8 font-display text-7xl font-bold text-maroon-800">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-maroon-900">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 text-stone-600">{t("notFound.text")}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon-800 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-maroon-700"
        >
          <House className="h-5 w-5" aria-hidden="true" />
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
