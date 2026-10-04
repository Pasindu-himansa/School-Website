import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  Bell,
  House,
  Lock,
  Mail,
  Menu,
  Telescope,
  Users,
  X,
} from "lucide-react";
import logo from "../assets/amv-logo.png";

const links = [
  { to: "/", key: "home", icon: House, end: true },
  { to: "/vision", key: "vision", icon: Telescope },
  { to: "/staff", key: "staff", icon: Users },
  { to: "/notifications", key: "notifications", icon: Bell },
  { to: "/contact", key: "contact", icon: Mail },
];

const LanguageToggle = ({ current, onChange }) => (
  <div className="flex rounded-full bg-maroon-950/40 p-1 text-sm font-semibold">
    {[
      ["en", "EN"],
      ["si", "සිං"],
    ].map(([code, label]) => (
      <button
        key={code}
        type="button"
        onClick={() => onChange(code)}
        aria-pressed={current === code}
        className={`rounded-full px-3 py-1 transition ${
          current === code
            ? "bg-gold-300 text-maroon-900 shadow"
            : "text-maroon-100 hover:text-white"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 bg-maroon-800 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-maroon-950/30" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt=""
            className="h-11 w-11 rounded-full ring-2 ring-gold-300/60 transition-shadow duration-300 group-hover:ring-gold-300 lg:h-12 lg:w-12"
          />
          <span className="font-display text-base leading-tight font-bold tracking-wide sm:text-lg lg:text-xl">
            {t("navbar.schoolName")}
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(({ to, key, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `group relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-gold-300" : "text-maroon-50 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t(`navbar.${key}`)}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-gold-300 transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          <Link
            to="/admin/login"
            className="ml-3 flex items-center gap-1.5 rounded-full bg-gold-300 px-4 py-2 text-sm font-semibold text-maroon-900 transition hover:-translate-y-0.5 hover:bg-gold-200 hover:shadow-md"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            {t("navbar.admin")}
          </Link>

          <div className="ml-3">
            <LanguageToggle current={i18n.language} onChange={changeLanguage} />
          </div>
        </div>

        {/* Mobile + tablet */}
        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-maroon-700 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={t("common.menu")}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="animate-slide-down border-t border-maroon-700 px-4 pt-2 pb-5 lg:hidden">
          <div className="flex flex-col">
            {links.map(({ to, key, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition ${
                    isActive
                      ? "bg-maroon-900 text-gold-300"
                      : "hover:bg-maroon-700"
                  }`
                }
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {t(`navbar.${key}`)}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              to="/admin/login"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-full bg-gold-300 px-4 py-2 font-semibold text-maroon-900"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              {t("navbar.admin")}
            </Link>
            <LanguageToggle current={i18n.language} onChange={changeLanguage} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
