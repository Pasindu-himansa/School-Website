import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../Services/api";

const SpecialNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await API.get("/notifications/special");
        setNotifications(data);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            {i18n.language === "si" ? "විශේෂ නිවේදන" : "Special Notifications"}
          </h1>
          <p className="mt-4 text-gray-600">
            {i18n.language === "si"
              ? "සිසුන් සහ දෙමාපියන් සඳහා වැදගත් නිවේදන සහ යාවත්කාලීන කිරීම්."
              : "Important announcements and updates for students and parents."}
          </p>
        </div>

        {loading ? (
          <div className="text-center text-lg text-gray-600">
            {i18n.language === "si"
              ? "නිවේදන පූරණය වෙමින් පවතී..."
              : "Loading notifications..."}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            {i18n.language === "si"
              ? "විශේෂ නිවේදන නොමැත."
              : "No special notifications available."}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {notifications.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={
                      typeof item.title === "object"
                        ? item.title[i18n.language] || item.title.en
                        : item.title
                    }
                    className="mb-4 h-56 w-full rounded-xl object-cover"
                  />
                )}

                <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  {typeof item.category === "object"
                    ? item.category[i18n.language] || item.category.en
                    : item.category}
                </span>

                <h2 className="mt-4 text-2xl font-bold text-blue-900">
                  {typeof item.title === "object"
                    ? item.title[i18n.language] || item.title.en
                    : item.title}
                </h2>

                {item.summary && (
                  <p className="mt-3 text-gray-600">
                    {typeof item.summary === "object"
                      ? item.summary[i18n.language] || item.summary.en
                      : item.summary}
                  </p>
                )}

                <p className="mt-4 leading-7 text-gray-700">
                  {typeof item.content === "object"
                    ? item.content[i18n.language] || item.content.en
                    : item.content}
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

export default SpecialNotifications;
