import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../Services/api.js";

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

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
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            {t("staff.title")}
          </h1>
          <p className="mt-4 text-gray-600">{t("staff.subtitle")}</p>
        </div>

        {loading ? (
          <div className="text-center text-lg text-gray-600">
            {t("staff.loading")}
          </div>
        ) : staffMembers.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            {t("staff.empty")}
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {staffMembers.map((member) => (
              <div
                key={member._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
              >
                <div className="aspect-square w-full bg-gray-200">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={
                        typeof member.name === "object"
                          ? member.name[i18n.language] || member.name.en
                          : member.name
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                      No Photo
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {typeof member.name === "object"
                      ? member.name[i18n.language] || member.name.en
                      : member.name}
                  </h2>

                  <p className="mt-1 font-medium text-yellow-600">
                    {typeof member.position === "object"
                      ? member.position[i18n.language] || member.position.en
                      : member.position}
                  </p>

                  {member.bio && (
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {typeof member.bio === "object"
                        ? member.bio[i18n.language] || member.bio.en
                        : member.bio}
                    </p>
                  )}

                  <div className="mt-4 space-y-1 text-sm text-gray-500">
                    {member.email && (
                      <p>
                        {t("staff.email")}: {member.email}
                      </p>
                    )}
                    {member.phone && (
                      <p>
                        {t("staff.phone")}: {member.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;
