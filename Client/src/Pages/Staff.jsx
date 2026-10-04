import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, User, Users } from "lucide-react";
import API from "../Services/api.js";
import PageHeader from "../Components/PageHeader";
import Reveal from "../Components/Reveal";
import { localize } from "../Services/localize";

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await API.get("/staff");
        setStaffMembers(data);
      } catch (error) {
        console.log("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div>
      <PageHeader
        icon={Users}
        title={t("staff.title")}
        subtitle={t("staff.subtitle")}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <div
            className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4"
            aria-label={t("staff.loading")}
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-96" />
            ))}
          </div>
        ) : staffMembers.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center text-stone-500">
            <Users className="h-14 w-14 text-maroon-200" aria-hidden="true" />
            <p className="mt-4 text-lg">{t("staff.empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {staffMembers.map((member, i) => {
              const name = localize(member.name, lang);
              const bio = localize(member.bio, lang);

              return (
                <Reveal key={member._id} delay={(i % 4) * 100}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 shadow-stone-900/5 ring-stone-200/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-maroon-100 to-maroon-200">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center text-maroon-400">
                          <User className="h-16 w-16" aria-hidden="true" />
                          <span className="mt-2 text-sm">
                            {t("staff.noPhoto")}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-maroon-950/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-6">
                      <h2 className="text-lg font-bold text-maroon-900 sm:text-xl">
                        {name}
                      </h2>
                      <p className="mt-1 text-xs font-semibold tracking-wide text-gold-700 uppercase sm:text-sm">
                        {localize(member.position, lang)}
                      </p>

                      {bio && (
                        <p className="mt-3 text-xs leading-5 text-stone-600 sm:mt-4 sm:text-sm sm:leading-6">
                          {bio}
                        </p>
                      )}

                      {(member.email || member.phone) && (
                        <div className="mt-auto pt-5">
                          <div className="space-y-2 border-t border-stone-100 pt-4 text-sm">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                title={member.email}
                                className="flex items-center gap-2.5 text-stone-600 transition hover:text-maroon-700"
                              >
                                <Mail
                                  className="h-4 w-4 shrink-0 text-maroon-700"
                                  aria-label={t("staff.email")}
                                />
                                <span className="truncate">{member.email}</span>
                              </a>
                            )}
                            {member.phone && (
                              <a
                                href={`tel:${member.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-2.5 text-stone-600 transition hover:text-maroon-700"
                              >
                                <Phone
                                  className="h-4 w-4 shrink-0 text-maroon-700"
                                  aria-label={t("staff.phone")}
                                />
                                <span className="truncate">{member.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
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

export default Staff;
