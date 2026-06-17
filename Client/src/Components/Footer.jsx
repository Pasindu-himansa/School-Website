import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-red-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">School Website</h3>
            <p className="mt-3 text-sm text-gray-300">
              {t("footer.schoolText")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              {t("footer.quickLinks")}
            </h3>

            <div className="flex flex-col gap-2 text-gray-300">
              <Link to="/" className="hover:text-yellow-300">
                {t("navbar.home")}
              </Link>
              <Link to="/vision" className="hover:text-yellow-300">
                {t("navbar.vision")}
              </Link>
              <Link to="/staff" className="hover:text-yellow-300">
                {t("navbar.staff")}
              </Link>
              <Link
                to="/special-notifications"
                className="hover:text-yellow-300"
              >
                {t("navbar.notifications")}
              </Link>
              <Link to="/contact" className="hover:text-yellow-300">
                {t("navbar.contact")}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              {t("footer.contactTitle")}
            </h3>

            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 {t("contact.address")}</p>
              <p>📞 {t("contact.phone")}</p>
              <p>✉️ {t("contact.email")}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} School Website. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
