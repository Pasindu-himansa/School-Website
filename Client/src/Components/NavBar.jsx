import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logo from "../assets/amv-logo.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <nav className="bg-red-900 text-white shadow-md">
      <div className="flex w-full items-center justify-between px-4 py-3 lg:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="School Logo"
            className="h-10 w-auto pl-10 object-contain lg:h-12"
          />

          {/* Mobile + Tablet */}
          <h1 className="text-md font-bold pl-5 lg:hidden">
            {t("navbar.schoolName")}
          </h1>

          {/* Desktop */}
          <h1 className="hidden text-xl pl-10 font-bold lg:block">
            {t("navbar.schoolName")}
          </h1>
        </Link>

        {/* Desktop menu only */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link to="/" className="hover:text-yellow-300">
            {t("navbar.home")}
          </Link>

          <Link to="/vision" className="hover:text-yellow-300">
            {t("navbar.vision")}
          </Link>

          <Link to="/staff" className="hover:text-yellow-300">
            {t("navbar.staff")}
          </Link>

          <Link to="/special-notifications" className="hover:text-yellow-300">
            {t("navbar.notifications")}
          </Link>

          <Link to="/contact" className="hover:text-yellow-300">
            {t("navbar.contact")}
          </Link>

          <Link
            to="/admin/login"
            className="rounded bg-yellow-400 px-3 py-1 font-semibold text-red-900 hover:bg-yellow-300"
          >
            {t("navbar.admin")}
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => changeLanguage("en")}
              className="rounded bg-white px-2 py-1 text-sm text-blue-900"
            >
              EN
            </button>

            <button
              onClick={() => changeLanguage("si")}
              className="rounded bg-white px-2 py-1 text-sm text-blue-900"
            >
              සිං
            </button>
          </div>
        </div>

        {/* Mobile + Tablet hamburger */}
        <button
          className="text-2xl lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile + Tablet dropdown */}
      {menuOpen && (
        <div className="space-y-3 border-t border-red-800 px-4 pb-4 pt-3 lg:hidden">
          <Link to="/" className="block" onClick={() => setMenuOpen(false)}>
            {t("navbar.home")}
          </Link>

          <Link
            to="/vision"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.vision")}
          </Link>

          <Link
            to="/staff"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.staff")}
          </Link>

          <Link
            to="/special-notifications"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.notifications")}
          </Link>

          <Link
            to="/contact"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.contact")}
          </Link>

          <Link
            to="/admin/login"
            className="mt-2 inline-block rounded bg-yellow-400 px-3 py-2 font-semibold text-red-900"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.admin")}
          </Link>

          <div className="flex gap-3 pt-3">
            <button
              onClick={() => changeLanguage("en")}
              className="rounded bg-white px-3 py-1 text-sm text-blue-900"
            >
              EN
            </button>

            <button
              onClick={() => changeLanguage("si")}
              className="rounded bg-white px-3 py-1 text-sm text-blue-900"
            >
              සිං
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
