import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../Services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await API.get("/notifications");
        // special notices first, newest first within each group
        setNotifications([...data].sort((a, b) => b.isSpecial - a.isSpecial));
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const localize = (field) =>
    typeof field === "object" ? field?.[i18n.language] || field?.en : field;

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            {t("notifications.title")}
          </h1>
          <p className="mt-4 text-gray-600">{t("notifications.subtitle")}</p>
        </div>

        {loading ? (
          <div className="text-center text-lg text-gray-600">
            {t("notifications.loading")}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            {t("notifications.empty")}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {notifications.map((item) => (
              <div
                key={item._id}
                className={`rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg ${
                  item.isSpecial ? "ring-2 ring-red-800" : ""
                }`}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={localize(item.title)}
                    className="mb-4 h-56 w-full rounded-xl object-cover"
                  />
                )}

                <div className="flex flex-wrap gap-2">
                  {item.isSpecial && (
                    <span className="inline-block rounded-full bg-red-800 px-3 py-1 text-sm font-medium text-white">
                      {t("notifications.special")}
                    </span>
                  )}
                  <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                    {localize(item.category)}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-blue-900">
                  {localize(item.title)}
                </h2>

                {localize(item.summary) && (
                  <p className="mt-3 text-gray-600">{localize(item.summary)}</p>
                )}

                <p className="mt-4 whitespace-pre-line leading-7 text-gray-700">
                  {localize(item.content)}
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
