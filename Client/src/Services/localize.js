// Database fields are stored as { en, si }; pick the current language,
// falling back to English.
export const localize = (field, language) =>
  typeof field === "object" && field !== null
    ? field[language] || field.en || ""
    : field || "";

export const formatDate = (value, language) =>
  new Date(value).toLocaleDateString(language === "si" ? "si-LK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
