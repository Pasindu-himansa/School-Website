import { useTranslation } from "react-i18next";

const Vision = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl bg-white p-10 shadow-md">
          <h1 className="text-4xl font-bold text-blue-900">
            {t("vision.title")}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-700">
            {t("vision.text")}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-6">
              <h2 className="text-2xl font-semibold text-blue-900">
                {t("vision.missionTitle")}
              </h2>
              <p className="mt-3 leading-7 text-gray-700">
                {t("vision.missionText")}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-6">
              <h2 className="text-2xl font-semibold text-blue-900">
                {t("vision.valuesTitle")}
              </h2>
              <p className="mt-3 leading-7 text-gray-700">
                {t("vision.valuesText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
