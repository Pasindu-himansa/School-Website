import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(() => window.scrollY > 500);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={t("common.backToTop")}
      title={t("common.backToTop")}
      className={`fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-maroon-800 text-gold-300 shadow-lg shadow-maroon-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-maroon-700 ${
        show
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-75 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
