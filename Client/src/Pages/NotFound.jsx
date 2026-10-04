import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="text-6xl font-bold text-red-900">404</p>
        <h1 className="mt-4 text-3xl font-bold text-blue-900">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 text-gray-600">{t("notFound.text")}</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-blue-900 px-6 py-2 font-semibold text-white hover:bg-blue-800"
        >
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
