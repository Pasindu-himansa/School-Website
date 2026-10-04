import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import si from "./locales/si.json";

const savedLanguage = localStorage.getItem("language") || "en";

// keep <html lang> and the tab title in the chosen language
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.title = i18n.t("navbar.schoolName");
});

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    si: { translation: si },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
