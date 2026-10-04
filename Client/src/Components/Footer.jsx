import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/amv-logo.png";

const quickLinks = [
  ["/", "home"],
  ["/vision", "vision"],
  ["/staff", "staff"],
  ["/notifications", "notifications"],
  ["/contact", "contact"],
];

const Footer = () => {
  const { t } = useTranslation();

  const contactItems = [
    { icon: MapPin, text: t("contact.address") },
    {
      icon: Phone,
      text: t("contact.phone"),
      href: `tel:${t("contact.phone").replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      text: t("contact.email"),
      href: `mailto:${t("contact.email")}`,
    },
    { icon: Clock, text: t("contact.hours") },
  ];

  return (
    <footer className="border-t-4 border-gold-300 bg-maroon-950 text-maroon-100">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt=""
                className="h-14 w-14 rounded-full ring-2 ring-gold-300/50"
              />
              <h3 className="text-xl leading-tight font-bold text-white">
                {t("navbar.schoolName")}
              </h3>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-maroon-200">
              {t("footer.schoolText")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gold-300">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(([to, key]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-1.5 text-maroon-100 transition hover:text-gold-300"
                  >
                    <ChevronRight
                      className="h-4 w-4 text-gold-300/70 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                    {t(`navbar.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gold-300">
              {t("footer.contactTitle")}
            </h3>
            <ul className="space-y-3 text-sm">
              {contactItems.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maroon-900 text-gold-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="pt-1.5 transition hover:text-gold-300"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="pt-1.5">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-maroon-900 pt-6 text-center text-sm text-maroon-300">
          © {new Date().getFullYear()} {t("navbar.schoolName")}.{" "}
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
