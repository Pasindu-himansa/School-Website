import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bell, BellOff, CalendarDays, Pin, Tag } from "lucide-react";
import API from "../Services/api";
import PageHeader from "../Components/PageHeader";
import Reveal from "../Components/Reveal";
import { formatDate, localize } from "../Services/localize";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

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

  return (
    <div>
      <PageHeader
        icon={Bell}
        title={t("notifications.title")}
        subtitle={t("notifications.subtitle")}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        {loading ? (
          <div
            className="grid gap-8 md:grid-cols-2"
            aria-label={t("notifications.loading")}
          >
            {[0, 1].map((i) => (
              <div key={i} className="skeleton h-72" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center text-stone-500">
            <BellOff className="h-14 w-14 text-maroon-200" aria-hidden="true" />
            <p className="mt-4 text-lg">{t("notifications.empty")}</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {notifications.map((item, i) => {
              const title = localize(item.title, lang);
              const summary = localize(item.summary, lang);

              return (
                <Reveal key={item._id} delay={(i % 2) * 120}>
                  <article
                    className={`group relative h-full overflow-hidden rounded-3xl bg-white shadow-lg ring-1 shadow-stone-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                      item.isSpecial
                        ? "ring-2 ring-gold-300"
                        : "ring-stone-200/70"
                    }`}
                  >
                    {item.isSpecial && (
                      <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300" />
                    )}

                    {item.imageUrl && (
                      <div className="overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={title}
                          loading="lazy"
                          className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.isSpecial && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold-300 px-3 py-1 text-xs font-semibold text-maroon-900">
                            <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                            {t("notifications.special")}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 rounded-full bg-maroon-50 px-3 py-1 text-xs font-semibold text-maroon-800">
                          <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                          {localize(item.category, lang)}
                        </span>
                        <span className="ml-auto inline-flex items-center gap-1.5 text-sm text-stone-500">
                          <CalendarDays
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          {formatDate(item.createdAt, lang)}
                        </span>
                      </div>

                      <h2 className="mt-5 text-2xl font-bold text-maroon-900">
                        {title}
                      </h2>

                      {summary && (
                        <p className="mt-3 font-medium text-stone-700">
                          {summary}
                        </p>
                      )}

                      <p className="mt-4 leading-7 whitespace-pre-line text-stone-600">
                        {localize(item.content, lang)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Notifications;
